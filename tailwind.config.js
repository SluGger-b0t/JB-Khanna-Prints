/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2f4f4f',
        secondary: '#f7e0ab',
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        whisper: ['var(--font-whisper)', 'cursive'],
        cormorant: ['var(--font-cormorant)', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
