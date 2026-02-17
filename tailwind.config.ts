import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0C2340',
          'navy-light': '#163460',
          gold: '#C8933C',
          'gold-light': '#DEB068',
          'gold-dark': '#A97A2E',
          cream: '#F5F0E8',
          forest: '#1B4332',
          stone: '#8B8178',
          'stone-light': '#A8A098',
        },
        surface: {
          primary: '#FDFBF7',
          secondary: '#F5F0E8',
          muted: '#E8E2D8',
          dark: '#0A1C30',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-josefin)', 'sans-serif'],
      },
      boxShadow: {
        lodge: '0 4px 20px -2px rgba(12,35,64,0.08)',
        'lodge-lg': '0 10px 40px -4px rgba(12,35,64,0.12)',
        'lodge-xl': '0 20px 60px -8px rgba(12,35,64,0.18)',
        gold: '0 4px 14px -2px rgba(200,147,60,0.3)',
        'gold-lg': '0 8px 30px -4px rgba(200,147,60,0.4)',
        'inner-glow': 'inset 0 0 30px rgba(200,147,60,0.1)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(12,35,64,0.7) 0%, rgba(12,35,64,0.2) 40%, rgba(12,35,64,0.8) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C8933C 0%, #DEB068 50%, #C8933C 100%)',
        'navy-gradient': 'linear-gradient(180deg, #0C2340 0%, #163460 100%)',
        'radial-gold': 'radial-gradient(ellipse at center, rgba(200,147,60,0.15) 0%, transparent 70%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 3s infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
