var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ip = require('ip');

new webpack.IgnorePlugin(/vertx/);

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        //compress: true,
        
        port: 9996,
        host: ip.address()
    },

    externals: {
        'TweenLite': 'TweenLite'
    },
    module: {
        rules: [{
            test: /\.(rhtml|csv|svg|html)$/,
            use: 'raw-loader'
        }, {
            test: /\.(css|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader', 'postcss-loader']
            })
        }, {
            loader: "babel-loader",
            exclude: /node_modules/,
            test: /\.js?$/,
            query: {
                presets: ['es2015', 'stage-0']
            }
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }, {
            test: /\.(gif|png|jpe?g)$/i,
            loaders: [
                {
                    loader: "file-loader",
                    options: {
                        name: 'common/media/images/[name].[ext]'
                    }
                }
            ]
        }, {
            test: /\.(ttf|eot|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                name: 'common/fonts/[name].[ext]',
            }
        }, {
            test: /\.(mp3|wav)$/,
            loader: 'file-loader',
            options: {
                name: 'common/media/audio/[name].[ext]',
            }
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer] } }),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('style.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/vertx/),
        new CopyWebpackPlugin([
            { from: 'app/index.html' }
           /* ,{ from: 'app/favicon.ico' }*/
        ])
    ]
};