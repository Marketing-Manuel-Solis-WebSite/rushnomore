import { Facebook, Instagram, Youtube } from 'lucide-react';
import { SOCIAL } from '@/data/site';

/** lucide-react ships no TikTok glyph, so inline it. */
function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M16.72 5.68a4.83 4.83 0 0 1-1.2-3.18h-3.4v13.13a2.92 2.92 0 1 1-2.09-2.8V9.4a6.23 6.23 0 1 0 5.49 6.19V8.9a8.2 8.2 0 0 0 4.78 1.53V7.03a4.84 4.84 0 0 1-3.58-1.35Z" />
    </svg>
  );
}

const ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: TikTok,
} as const;

const CHIP = {
  dark: 'bg-white/5 border-white/10 text-white/60 hover:bg-brand-gold hover:border-brand-gold hover:text-brand-navy',
  light:
    'bg-white border-gray-200 text-brand-navy/70 shadow-sm hover:bg-brand-gold hover:border-brand-gold hover:text-white',
} as const;

const SIZE = {
  sm: { box: 'w-9 h-9', icon: 'w-4 h-4' },
  md: { box: 'w-10 h-10', icon: 'w-[18px] h-[18px]' },
} as const;

/** Icon-only row — footer, header drawer. */
export function SocialLinks({
  variant = 'dark',
  size = 'md',
  className = '',
}: {
  variant?: keyof typeof CHIP;
  size?: keyof typeof SIZE;
  className?: string;
}) {
  const s = SIZE[size];
  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {SOCIAL.map((p) => {
        const Icon = ICONS[p.key];
        return (
          <li key={p.key}>
            <a
              href={p.href}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={`Rush No More on ${p.label} — ${p.handle} (opens in a new tab)`}
              title={`${p.label} — ${p.handle}`}
              className={`flex ${s.box} items-center justify-center rounded-lg border transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${CHIP[variant]}`}
            >
              <Icon className={s.icon} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Labelled rows — contact page, where the handle itself is useful content. */
export function SocialCards({ className = '' }: { className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {SOCIAL.map((p) => {
        const Icon = ICONS[p.key];
        return (
          <li key={p.key}>
            <a
              href={p.href}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={`Rush No More on ${p.label} — ${p.handle} (opens in a new tab)`}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-brand-gold/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/20 transition-colors group-hover:bg-brand-gold/30">
                <Icon className="h-5 w-5 text-brand-gold" />
              </span>
              <span>
                <span className="block text-sm font-bold text-white">{p.label}</span>
                <span className="text-xs text-white/40">{p.handle}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
