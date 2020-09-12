
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../client/client-entry.js'),
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist/'),
        publicPath: 'http://127.0.0.1:8080/'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../client')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // 为了确保 JS 的转译应用到 node_modules 的 Vue 单文件组件，你需要通过使用一个排除函数将它们加入白名单
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         'vue-style-loader',
            //         'css-loader',
            //         'postcss-loader'
            //     ]
            // },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'images/[name].[hash:8].[ext]',
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        require('autoprefixer'),
        new StyleLintPlugin({
            files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
            fix: true
        }),
        new FriendlyErrorsWebpackPlugin()
    ],
}
