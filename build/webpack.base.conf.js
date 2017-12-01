var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
// var webpack = require('webpack');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {

    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            // '/static': resolve('static'),
            // 'jquery': resolve('static/js/jquery.min.js'),
            // 'layer': resolve('static/js/layer/layer.js'),
            // 'select2': resolve('static/js/select2')
            // 'select2': resolve('src/assets/js/select2')
        }
    },
    // plugins:[
    //     new webpack.ProvidePlugin({
    //         $: 'jquery',
    //         jQuery: 'jquery',
    //         'window.jQuery': 'jquery',
    //     })
    // ],
    externals: {
        "CKEDITOR": "window.CKEDITOR"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('/node_modules/element-ui/src'), resolve('/node_modules/element-ui/packages')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
