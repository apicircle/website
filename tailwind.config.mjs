import typography from '@tailwindcss/typography';

/**
 * Theme tokens are RGB triplets (no #, no rgb()) defined in src/styles/global.css
 * so Tailwind's `rgb(var(--token) / <alpha-value>)` syntax works and every color
 * flips automatically between the light (`:root`) and dark (`html.dark`) themes.
 *
 * The palette mirrors API Circle Studio's own theme tokens — brand violet
 * (#8b5cf6) plus the six connection-node accents from the logo.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        edge: {
          DEFAULT: 'rgb(var(--edge) / <alpha-value>)',
          strong: 'rgb(var(--edge-strong) / <alpha-value>)',
        },
        fg: {
          DEFAULT: 'rgb(var(--fg) / <alpha-value>)',
          muted: 'rgb(var(--fg-muted) / <alpha-value>)',
          dim: 'rgb(var(--fg-dim) / <alpha-value>)',
        },
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          soft: 'rgb(var(--brand-soft) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          fg: 'rgb(var(--accent-fg) / <alpha-value>)',
        },
        // Connection-node accents (from the logo)
        node: {
          green: 'rgb(var(--node-green) / <alpha-value>)',
          blue: 'rgb(var(--node-blue) / <alpha-value>)',
          amber: 'rgb(var(--node-amber) / <alpha-value>)',
          red: 'rgb(var(--node-red) / <alpha-value>)',
          sky: 'rgb(var(--node-sky) / <alpha-value>)',
        },
        // HTTP-method colors, matching the Studio editor
        method: {
          get: 'rgb(var(--node-green) / <alpha-value>)',
          post: 'rgb(var(--node-blue) / <alpha-value>)',
          put: 'rgb(var(--node-amber) / <alpha-value>)',
          delete: 'rgb(var(--node-red) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: [
          'Inter Variable',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono Variable',
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--brand) / 0.25), 0 8px 40px -8px rgb(var(--brand) / 0.45)',
        panel: '0 1px 0 0 rgb(var(--edge) / 0.6), 0 18px 50px -24px rgb(0 0 0 / 0.5)',
        card: '0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.18)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(rgb(var(--edge) / 0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--edge) / 0.5) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      },
    },
  },
  plugins: [typography],
};
