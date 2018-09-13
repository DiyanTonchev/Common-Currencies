const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.join(__dirname),
    devtool: debug ? 'inline-sourcemap' : null,
    mode: debug ? 'development' : 'production',
    entry: './src/js/client.js',
    output: {
        path: __dirname + '/src/',
        filename: 'client.min.js'
    },
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 5000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties']
                }    
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
};