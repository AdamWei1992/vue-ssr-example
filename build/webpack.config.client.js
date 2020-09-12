const path = require('path');
const webpackMerge = require('webpack-merge');
const configBase = require('./webpack.config.base');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../client/index.html'),
        filename: 'index.html',
        chunks: ['vendors', 'commons', 'main']
    }),
    new VueClientPlugin()
];

let config = {};
if (isDev) {

    config = {
        mode: 'development',
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        'vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                importLoaders: 2
                            }
                        },
                        'less-loader',
                        'postcss-loader'
                    ]
                },
            ]
        },
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
        ]),
        devServer: {
            contentBase: './dist',
            hot: true,
            stats: 'errors-only',
            host: '0.0.0.0',
            proxy: {
                '/api': 'http://127.0.0.1:3333',
                '/user': 'http://127.0.0.1:3333',
            },
            historyApiFallback: {
                index: '/index.html'
            },
        },
    }

} else {

    config = {
        mode: 'production',
        stats: 'normal',
        output: {
            filename: '[name].[chunkhash:8].js',
            publicPath: '/dist/'
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                importLoaders: 2
                            }
                        },
                        'less-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
            ]
        },
        plugins: defaultPlugins.concat([
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    path.resolve(__dirname, '../dist')
                ]
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css'
            }),
        ]),
        optimization: {
            splitChunks: {
                minSize: 0,
                cacheGroups: {
                    vendors: {
                        test: /(vue)/,
                        name: 'vendors',
                        chunks: 'all'
                    },
                    commons: {
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 2,
                        reuseExistingChunk: true
                    }
                }
            },
            runtimeChunk: true,
        }
    };
}

config.resolve = {
    alias: {
        'model': path.join(__dirname, '../client/model/client-model.js')
    }
}

config = webpackMerge(configBase, config);

module.exports = config;
