const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
    // rukou
    entry: {
        app: [
            "@babel/polyfill",
            path.join(__dirname, '../src/index')
        ],
        vendor: ['react', 'react-router-dom', 'react-dom']
    },
    /* 输出到dist文件夹，输出文件名字为bundle.js */
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "bundle.js",
        chunkFilename: '[name].[chunkhash].js',
        publicPath: "/"
    },
    /* cacheDirectory是用来缓存编译结果，下次编译加速 */
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader?cacheDirectory=true"],
                include: path.join(__dirname, "../src")
            },
            {
                test: /\.tsx?$/, loader: "ts-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
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
            filename: "index.html",
            template: path.join(__dirname, "../public/index.html")
        }),
    ],
    // 别名配置
    resolve: {
        extensions: [" ", ".ts", ".tsx", ".js"],
        alias: {
            components: path.join(__dirname, "../src/components"),
            images: path.join(__dirname, "../src/images")
        }
    },
    devServer: {
        compress: true,  // gzip压缩
        host: '0.0.0.0', // 允许ip访问
        hot: true, // 热更新
        port: 8000 // 端口
    },

    devtool: "inline-source-map",

    mode: "development"
};
