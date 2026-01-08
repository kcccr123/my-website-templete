/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        'glass': 'var(--glass-bg)',
        'glass-border': 'var(--glass-border)',
        'glass-border-hover': 'var(--glass-border-hover)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      boxShadow: {
        'glass': 'var(--glass-shadow)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      lineHeight: {
        'relaxed': '1.625',
      }
    },
  },
  plugins: [],
}