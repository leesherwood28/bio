/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{jsx,tsx}', './src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
      },
      animation: {
        wordRotate: 'wordRotate 9s linear infinite 0s',
      },
      keyframes: {
        wordRotate: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: 0,
            'animation-timing-function': 'ease-in',
          },
          '7%': {
            transform: 'translateY(0%)',
            opacity: 1,
          },
          '33%': {
            transform: 'translateY(0%)',
            opacity: 1,
          },
          '40%': {
            transform: 'translateY(100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
