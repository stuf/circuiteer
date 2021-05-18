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
    opacity: ({ variants }) => [...variants('opacity'), 'disabled'],
    backgroundColor: ({ variants }) => [
      ...variants('backgroundColor'),
      'disabled',
    ],
    ringColor: ({ variants }) => [...variants('ringColor'), 'disabled'],
    borderColor: ({ variants }) => [...variants('borderColor'), 'disabled'],

    extend: {
      borderWidth: ['group-focus', 'group-hover', 'focus-within', 'disabled'],
      ringWidth: ['group-focus', 'group-hover', 'focus-within', 'disabled'],
    },
  },
  plugins: [require('tailwindcss-interaction-variants')],
};
