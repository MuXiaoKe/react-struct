/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const theme = require('./theme');
// __dirname 执行的js文件的绝对路径， ./ 返回你执行 node 命令的路径
const srcDir = path.join(__dirname, '../src');
// 环境变量
const APP_ENV = process.env.NODE_ENV;
const DEV_ENV = APP_ENV === 'development';
const PRD_ENV = APP_ENV === 'production';
// 静态资源访问域名（CDN）
// const STATICDOMAIN = APP_ENV === 'production' ? '.' : ''; // 之前的环境是qa
const STATICDOMAIN = '';

const config = {
    index: path.resolve(__dirname, './../index.html'),
    assetsRoot: path.resolve(__dirname, `./../dist/${APP_ENV}`),
    assetsPublicPath: DEV_ENV ? '/' : `${STATICDOMAIN}/dist/${APP_ENV}/`,
    // 静态资源目录
    assetsSubDir: 'static',
    // 正式环境接入sentry需要sourceMap
    sourceMap: APP_ENV !== 'production',
    extractCss: APP_ENV !== 'development'
};
//  拼接路径 字符串
const assetsPath = function(_path) {
    // path.join 兼容写法
    return path.posix.join(config.assetsSubDir, _path);
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
    // v4 的 hash这里改为v5的 contenthash
    output: {
        path: config.assetsRoot, // output 目录对应一个绝对路径。
        // 此选项决定了每个输出 bundle 的名称
        filename: DEV_ENV ? '[name].js' : assetsPath('js/[name].[contenthash].js'),
        // 此选项决定了非初始 chunk 文件的名称
        chunkFilename: DEV_ENV ? '[name].js' : assetsPath('js/[name].[id].[contenthash].js'),
        // 对于按需加载或加载外部资源（如图片、文件等） 资源的路径会加上publicPath定义的前缀
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
                include: [resolve('src')],
                exclude: /node_modules/,
                loader: 'ts-loader'
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
                // use: [
                //     {
                //         loader: 'url-loader',
                //         options: {
                //             limit: 8192,
                //             name: assetsPath('img/[name].[contenthash].[ext]')
                //             // esModule: false
                //         }
                //     }
                // ]
                type: 'asset',
                generator: {
                    filename : assetsPath('img/[hash][ext][query]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                // loader: 'url-loader',
                // options: {
                //     limit: 10000,
                //     name: assetsPath('fonts/[name].[contenthash].[ext]')
                // }
                type: 'asset',
                generator: {
                    filename : assetsPath('fonts/[hash][ext][query]')
                }
            }
        ]
    },
    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html'),
            favicon: 'public/favicon.ico'
        })
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
            '@styles': `${srcDir}/style`
        },
        //  v5 对crypto 没有polyfill 的兼容处理
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            path: require.resolve('path-browserify'),
            url: require.resolve('url'),
            buffer: require.resolve('buffer/'),
            util: require.resolve('util/'),
            stream: require.resolve('stream-browserify/')
        }
    }
};
