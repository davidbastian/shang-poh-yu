var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ip = require('ip'); 


module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        //compress: true,
        
        port: 9999,
        host: ip.address()
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
                'file-loader', {
                    loader: 'image-webpack-loader',
                    query: {
                        name: 'common/media/images/[name].[ext]',
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false,
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        }
                    }
                }
            ]
        }, {
            test: /\.(ttf|eot|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                name: 'common/fonts/[name].[ext]',
            }
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer] } }),
        new ExtractTextPlugin('style.css'),
       //new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        new CopyWebpackPlugin([
            { from: 'app/index.html' },
            { from: 'app/common/media/', to: 'common/media/' }
        ])
    ]
};