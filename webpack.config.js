var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
  entry: {
    app: path.resolve(__dirname, './src/main.js'),
    vendors: ['react','react-dom']
  },
  output: {
    path: './src',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './src',
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders:  ["react-hot", "babel?presets[]=es2015&presets[]=stage-0&presets[]=react"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
}
console.log('---> ', process.env.NODE_ENV );
//export NODE_ENV=production
// unset NODE_ENV
if (process.env.NODE_ENV === 'production') {
  config.output.path = path.join(__dirname, 'dist/')
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      screw_ie8: true
    }
  }));
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  }));
  config.plugins.push(new CopyWebpackPlugin([
          // {output}/file.txt
          //{ from: 'messages', to: 'messages' },
          { from: 'src/index.html', to: 'index.html' },
          { from: 'src/css', to: 'css'},
          { from: 'src/locales', to: 'locales'},
          { from: 'src/3rd-party', to: '3rd-party'},
          { from: 'src/favicon.ico', to: 'favicon.ico' }
        ], {
            ignore: [
                // Doesn't copy any files with a txt extension
                '*.txt'
            ]
        }));
}

module.exports = config
