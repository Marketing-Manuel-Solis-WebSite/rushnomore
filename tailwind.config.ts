import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { navy: '#0C2340', gold: '#C8933C', 'gold-light': '#DEB068', cream: '#F5F0E8', forest: '#1B4332', stone: '#8B8178' },
        surface: { primary: '#FDFBF7', secondary: '#F5F0E8', muted: '#E8E2D8' },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-josefin)', 'sans-serif'],
      },
      boxShadow: {
        lodge: '0 4px 20px -2px rgba(12,35,64,0.08)',
        'lodge-lg': '0 10px 40px -4px rgba(12,35,64,0.12)',
        gold: '0 4px 14px -2px rgba(200,147,60,0.3)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(12,35,64,0.65) 0%, rgba(12,35,64,0.25) 40%, rgba(12,35,64,0.75) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
