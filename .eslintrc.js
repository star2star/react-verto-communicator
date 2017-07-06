module.exports = {
  extends: 'airbnb',
  env: {
    'browser': true,
    'node': true,
    'jest': true
  },
  plugins: [
    'react', 'jsx-a11y', 'import', 'html'
  ],
  rules: {
    'react/jsx-filename-extension': [
      1, {
        extensions: ['.js', '.jsx']
      }
    ],
    /*"closingSlash": "never",
    "beforeSelfClosing": "always",
    "afterOpening": "never",*/
    "no-console": 0,
  }
};
