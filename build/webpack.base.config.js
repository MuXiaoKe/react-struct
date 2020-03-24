const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const postcssPresetEnv = require("postcss-preset-env");

const srcDir = path.join(__dirname, '../src');
const devMode = process.env.NODE_ENV !== 'production';

const APP_ENV = process.env.APP_ENV;
console.log(APP_ENV);
// 静态资源访问域名（CDN）
const STATICDOMAIN = APP_ENV === 'production' ? '.' : '';

const config = {
    index: path.resolve(__dirname, './../index.html'),
    assetsRoot: path.resolve(__dirname, `./../dist/${APP_ENV}`),
    assetsPublicPath: APP_ENV === 'development' ? '/' : `${STATICDOMAIN}/dist/${APP_ENV}/`,
    assetsSubDirectory: 'static',
    // 正式环境接入sentry需要sourceMap
    sourceMap: APP_ENV !== 'qa',
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
        ],
        vendor: ['react', 'react-router-dom', 'react-dom']
    },
    /* 输出到dist文件夹，输出文件名字为bundle.js */
    output: {
        path: config.assetsRoot,
        filename: APP_ENV === 'development' ? '[name].js' : assetsPath('js/[name].[hash].js'),
        chunkFilename:
            APP_ENV === 'development' ? '[name].js' : assetsPath('js/[name].[id].[hash].js'),
        publicPath: config.assetsPublicPath
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
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                include: [path.join(__dirname, '../', 'src')],
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader', 'css-loader',
                    {
                        loader: 'less-loader',
                        options: { javascriptEnabled: true }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html')
        })
    ],
    // 别名配置
    resolve: {
        extensions: [' ', '.ts', '.tsx', '.js'],
        alias: {
            '@components': `${srcDir}/components`, // path.join(__dirname, "../src/components"),
            '@assets': `${srcDir}/assets`, // path.join(__dirname, "../src/images"),
            '@src': srcDir,
            '@pages': `${srcDir}/pages`
        }
    }
};
