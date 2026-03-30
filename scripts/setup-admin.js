/**
 * Script para crear/configurar un usuario admin en Firebase Auth
 *
 * USO:
 *   node scripts/setup-admin.js
 *
 * Requiere que FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY
 * estén en tu .env.local
 */

const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const readline = require('readline');

// ─── Load .env.local ───
function loadEnv() {
  try {
    const envPath = resolve(__dirname, '..', '.env.local');
    const content = readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    console.error('Could not read .env.local — make sure it exists');
    process.exit(1);
  }
}

loadEnv();

// ─── Initialize Firebase Admin ───
// Try loading directly from service account JSON file first (most reliable on Windows)
const fs = require('fs');
const path = require('path');
const glob = require('path');

let credential;

// Look for service account JSON in Downloads folder or project root
const downloadDir = path.join(require('os').homedir(), 'Downloads');
const jsonFiles = fs.readdirSync(downloadDir).filter(f => f.includes('rushnomore') && f.endsWith('.json'));

if (jsonFiles.length > 0) {
  const saPath = path.join(downloadDir, jsonFiles[0]);
  console.log(`Using service account: ${saPath}`);
  const sa = JSON.parse(fs.readFileSync(saPath, 'utf-8'));
  credential = cert(sa);
} else {
  // Fallback to env vars
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    console.error('\n❌ Missing Firebase Admin credentials');
    console.error('   Place the service account JSON in your Downloads folder');
    console.error('   or set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env.local\n');
    process.exit(1);
  }
  credential = cert({ projectId, clientEmail, privateKey });
}

if (getApps().length === 0) {
  initializeApp({ credential });
}

const auth = getAuth();

// ─── Interactive prompts ───
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

async function main() {
  console.log('\n═══════════════════════════════════════════');
  console.log('  Rush No More — Admin User Setup');
  console.log('  Project: ' + (process.env.FIREBASE_PROJECT_ID || 'rushnomore-c9f23'));
  console.log('═══════════════════════════════════════════\n');

  const email = await ask('Admin email (e.g. admin@rushnomore.com): ');
  if (!email.includes('@')) {
    console.error('Invalid email');
    process.exit(1);
  }

  const password = await ask('Admin password (min 6 chars): ');
  if (password.length < 6) {
    console.error('Password must be at least 6 characters');
    process.exit(1);
  }

  const displayName = await ask('Display name (e.g. Carlos Admin): ');

  console.log('\n⏳ Setting up admin user...\n');

  let uid;

  // Try to find existing user
  try {
    const existing = await auth.getUserByEmail(email);
    uid = existing.uid;
    console.log(`✓ Found existing user: ${existing.uid}`);

    // Update password if user exists
    await auth.updateUser(uid, { password, displayName: displayName || undefined });
    console.log('✓ Updated password and display name');
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      // Create new user
      const newUser = await auth.createUser({
        email,
        password,
        displayName: displayName || 'Admin',
        emailVerified: true,
      });
      uid = newUser.uid;
      console.log(`✓ Created new user: ${uid}`);
    } else {
      console.error('Error:', err.message);
      process.exit(1);
    }
  }

  // Set custom claims
  await auth.setCustomUserClaims(uid, {
    admin: true,
    role: 'super-admin',
  });
  console.log('✓ Set custom claims: { admin: true, role: "super-admin" }');

  // Verify
  const user = await auth.getUser(uid);
  console.log('\n═══════════════════════════════════════════');
  console.log('  ✅ Admin user ready!');
  console.log('═══════════════════════════════════════════');
  console.log(`  UID:    ${user.uid}`);
  console.log(`  Email:  ${user.email}`);
  console.log(`  Name:   ${user.displayName}`);
  console.log(`  Claims: ${JSON.stringify(user.customClaims)}`);
  console.log('═══════════════════════════════════════════');
  console.log('\n  Now go to /admin/login and sign in with:');
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
  console.log('');

  rl.close();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
