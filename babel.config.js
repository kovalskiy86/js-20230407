module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: '> 3%'
      }
    }]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties'
  ]
};
