/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#fdf8f0', 100: '#f9eed8', 200: '#f2dbb1',
          300: '#e8c47f', 400: '#dcaa52', 500: '#c8923a',
        },
        plum: {
          50: '#f4f0f9',  100: '#e8dff4', 200: '#d0bee9',
          300: '#b08dd6', 400: '#8f5ec2', 500: '#7040aa',
          600: '#5a318e', 700: '#472673', 800: '#361b58', 900: '#26103f',
        },
        mauve: { 100: '#ede8f5', 200: '#c9b8e0', 300: '#a88bcb' },
        cream: '#fdf6ec',
        sand:  '#f0e6d3',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem', '3xl': '2rem' },
      boxShadow: {
        soft:  '0 2px 20px rgba(112,64,170,0.08)',
        plum:  '0 4px 30px rgba(112,64,170,0.18)',
        beige: '0 4px 24px rgba(200,146,58,0.15)',
      },
    },
  },
  plugins: [],
}
