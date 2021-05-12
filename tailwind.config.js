const colors = require('tailwindcss/colors');

const primary = colors.purple[700];

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary,
      },
      fontSize: {
        xxs: ['0.6rem', { lineHeight: '1rem' }],
      },
      fontFamily: theme => ({
        sans: ['"HK Grotesk"', 'Inter'],
      }),
      fill: theme => ({
        none: 'none',
        white: theme('colors.white'),
        red: theme('colors.red.500'),
        green: theme('colors.green.500'),
        black: theme('colors.black'),
      }),
      stroke: theme => ({
        none: 'none',
        white: theme('colors.white'),
        black: theme('colors.black'),
        red: theme('colors.red.500'),
        green: theme('colors.green.500'),
      }),
    },
  },
  variants: {
    extend: {
      borderWidth: ['group-focus', 'group-hover', 'focus-within'],
      borderColor: ['group-focus', 'group-hover', 'focus-within'],
      ringWidth: ['group-focus', 'group-hover', 'focus-within'],
      ringColor: ['group-focus', 'group-hover', 'focus-within'],
    },
  },
  plugins: [require('tailwindcss-interaction-variants')],
};
