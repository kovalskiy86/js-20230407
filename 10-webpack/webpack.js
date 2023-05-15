const path = require('path');

const obj = {
  mode: 'development',
  target: 'web',
  entry: {
    app: path.join(__dirname, './index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, './dist'),
  }
};


module.exports = obj;
