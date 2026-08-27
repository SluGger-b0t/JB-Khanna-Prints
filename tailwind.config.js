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
        'primary-light': '#426969',
        secondary: '#f7e0ab',
        cream: '#faf7f2',
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
