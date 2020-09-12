const path = require('path');
const webpackMerge = require('webpack-merge');
const configBase = require('./webpack.config.base');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueServerPlugin = require('vue-server-renderer/server-plugin');

const isDev = process.env.NODE_ENV === 'development';

const plugins = [
    // new MiniCssExtractPlugin({
    //     filename: 'css/[name].[contentHash:8].css'
    // }),
    new webpack.DefinePlugin({
        'process.env.VUE_ENV': '"server"'
    }),
    new webpack.NamedChunksPlugin(),
];

if (isDev) {
    // 生成server-bundle时需要这个plugin
    // 使用createBundleRenderer方法时需要
    plugins.push(new VueServerPlugin())
} else {
    // plugins.push(new MiniCssExtractPlugin({
    //     filename: 'css/[name].[contenthash:8].css'
    // }),)
}

const config = webpackMerge(configBase, {
    mode: isDev ? 'development' : 'production',
    target: 'node',
    entry: path.resolve(__dirname, '../client/server-entry.js'),
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs2',
        filename: 'server-entry.js',
        path: path.resolve(__dirname, '../server-build')
    },
    // 排除所依赖的包
    externals: Object.keys(require('../package.json').dependencies),
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    // isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'vue-style-loader',
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
                    },
                ]
            },
        ]
    },
    plugins,
    resolve: {
        alias: {
            'model': path.join(__dirname, '../client/model/server-model.js')
        }
    }
})

module.exports = config;
