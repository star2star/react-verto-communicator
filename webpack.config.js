const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {

  const removeEmpty = array => array.filter(p => !!p);
  console.log('DIR', __dirname)
  var config = {
    devtool:	'source-map',
    entry: {
      'app': [
            'react-hot-loader/patch',
            path.join(__dirname, './src/')
          ],
      //app: path.join(__dirname, './src/'),
      vendor: [
        'react',
        'react-dom',
        'react-router',
        'redux',
        'react-redux',
        'react-intl',
        'redux-thunk',


      ]
    },
    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, './build/'),
      publicPath: '/' // want everything relative to root '/'
    },
    devServer: {
      contentBase: path.join(__dirname, './src/'),
      historyApiFallback: true,
      inline: true,
      hot: true,
      contentBase: './src',
      port: 8080
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [ 'babel-loader?presets[]=es2015&presets[]=stage-0&presets[]=react&cacheDirectory=true']
        }
      ]
    },
    plugins: removeEmpty([
      new	webpack.HotModuleReplacementPlugin(),
			//new	webpack.NoErrorsPlugin(),
      // used to split out our specified vendors script
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity, filename: '[name].[hash].js'}),

      // HtmlWebpackPlugin will make sure our Javascript files are being called
      // from within our index.html
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html'),
        filename: 'index.html',
        inject: 'body'
      })
    ])
  }
  //console.log('---> ', process.env.NODE_ENV );
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
      {
        from: 'src/index.html',
        to: 'index.html'
      }, {
        from: 'src/css',
        to: 'css'
      }, {
        from: 'src/img',
        to: 'img'
      }, {
        from: 'images',
        to: 'img'
      }, {
        from: 'src/locales',
        to: 'locales'
      }, {
        from: 'src/3rd-party',
        to: '3rd-party'
      }, {
        from: 'src/favicon.ico',
        to: 'favicon.ico'
      }
    ], {
      ignore: [// Doesn't copy any files with a txt extension
        '*.txt']
    }));
  }

  return config;
};
