const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    devtool: 'none',
    /* 入口 */
    entry: {
        app: [
            // "@babel/polyfill",
            path.join(__dirname, '../src/index')
        ],
        vendor: ['react', 'react-router-dom', 'react-dom']
    },
    mode: 'production',
    /* 输出到dist文件夹，输出文件名字为bundle.js */
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/dist/'
    },
    /* src文件夹下面的以.js结尾的文件，要使用babel解析 */
    /* cacheDirectory是用来缓存编译结果，下次编译加速 */
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, '../src')
            },
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                include: [path.join(__dirname, '../', 'src')],
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },
    // 别名配置
    resolve: {
        extensions: [" ", ".ts", ".tsx", ".js"],
        alias: {
            components: path.join(__dirname, '../src/components'),
            images: path.join(__dirname, '../src/images'),
        }
    },
    // 插件配置
    plugins: [
        new CleanWebpackPlugin(), // 每次打包前清空
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({ // 压缩css
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        }),
        new OptimizeCssAssetsPlugin(),
        new BundleAnalyzerPlugin(
            {
               analyzerMode: 'server',
               analyzerHost: '127.0.0.1',
               analyzerPort: 8889,
               reportFilename: 'report.html',
               defaultSizes: 'parsed',
               openAnalyzer: true,
               generateStatsFile: false,
               statsFilename: 'stats.json',
               statsOptions: null,
               logLevel: 'info'
            }
        ),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};