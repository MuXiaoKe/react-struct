/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const postcssPresetEnv = require("postcss-preset-env");
// dayjs 切换momentjs 插件
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
// 进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const theme = require('./theme');
const srcDir = path.join(__dirname, '../src');

const APP_ENV = process.env.NODE_ENV;
console.log(APP_ENV, process.env.APP_ENV);
// 静态资源访问域名（CDN）
// 加个 './' 为相对目录，需要对静态资源地址目录做修改
// const STATICDOMAIN = APP_ENV === 'production' ? '.' : ''; 
const STATICDOMAIN = '';
const isDev = APP_ENV === 'development';
const config = {
    index: path.resolve(__dirname, './../index.html'),
    assetsRoot: path.resolve(__dirname, `./../dist/${APP_ENV}`),
    assetsPublicPath: APP_ENV === 'development' ? '/' : `${STATICDOMAIN}/dist/${APP_ENV}/`,
    assetsSubDirectory: 'static',
    // 正式环境接入sentry需要sourceMap
    sourceMap: APP_ENV === 'development',
    extractCss: APP_ENV !== 'development',
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
};
const assetsPath = function(_path) {
    return path.posix.join(config.assetsSubDirectory, _path);
};

const resolve = function(dir) {
    return path.join(__dirname, './../', dir);
};
module.exports = {
    // rukou
    entry: {
        app: [
            // "@babel/polyfill", // core-js v3 已经不需要这个
            path.join(__dirname, '../src/index.tsx')
        ]
    },
    /* 输出到dist文件夹，输出文件名字为bundle.js */
    output: {
        path: config.assetsRoot,
        filename: APP_ENV === 'development' ? '[name].js' : assetsPath('js/[name].[contenthash].js'),
        chunkFilename:
            APP_ENV === 'development' ? '[name].js' : assetsPath('js/[name].[id].[contenthash].js'),
        publicPath: config.assetsPublicPath,
        clean: true // 在生成文件之前清空 output 目录
    },
    /* cacheDirectory是用来缓存编译结果，下次编译加速 */
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.tsx?$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                // loader: 'ts-loader'
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: isDev
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: [path.join(__dirname, '../', 'src')],
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                ...theme
                            },
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset',
                generator: {
                    filename : assetsPath('img/[contenthash][ext][query]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename : assetsPath('fonts/[contenthash][ext][query]')
                }
            }
        ]
    },
    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html'),
            inject: true, // body 底部插入script
            favicon: 'public/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'auto'
        }),
        new AntdDayjsWebpackPlugin(),
        // 进度条
        new ProgressBarPlugin()

    ],
    // 别名配置
    resolve: {
        extensions: [' ', '.ts', '.tsx', '.js'],
        alias: {
            '@components': `${srcDir}/components`, // path.join(__dirname, "../src/components"),
            '@assets': `${srcDir}/assets`, // path.join(__dirname, "../src/images"),
            '@src': srcDir,
            '@pages': `${srcDir}/pages`,
            '@services': `${srcDir}/services`,
            '@store': `${srcDir}/store`,
            '@utils': `${srcDir}/utils`,
            '@styles': `${srcDir}/style`,
            'bn.js': path.resolve(process.cwd(), 'node_modules', 'bn.js')
        },
        //  v5 对crypto 没有polyfill 的兼容处理
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            path: require.resolve('path-browserify'),
            url: require.resolve('url'),
            buffer: require.resolve('buffer'),
            util: require.resolve('util'),
            stream: require.resolve('stream-browserify')
        }
    },
    cache: {
        type: 'filesystem' // 使用文件缓存
    }
};
