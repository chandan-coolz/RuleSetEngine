var webpack = require('webpack');
var path = require('path');

//var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var BUILD_DIR = path.resolve(__dirname, 'C:/xampp/htdocs/studio/js/modules');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'ruleEngine.js'
  },

    module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel',
        query: {
               presets: ['es2015', 'react']
            }
      },
     {
        test: /\.css$/,
        loader: ['style','css']  
     }
    ]
  },

  progress: true,
    resolve: {
        modulesDirectories: [
            'js',
            'node_modules'
        ],
        extensions: ['', '.json', '.js']
    },
/*  plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ] 
*/

};

module.exports = config;