const rawLoader = require('craco-raw-loader');

module.exports = {
  plugins: [{ plugin: rawLoader, options: { test: /\.md$/ } }],
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
