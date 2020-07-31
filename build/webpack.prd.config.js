const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.base.config');

const assetsPath = function(_path) {
    return path.posix.join('static', _path);
};
// const devMode = process.env.NODE_ENV !== 'production';
const prdConfig = merge(baseConfig, {
    devtool: 'none',
    mode: 'production',
    // 插件配置
    plugins: [
        new CleanWebpackPlugin(), // 每次打包前清空
        new MiniCssExtractPlugin({
            // 压缩css
            // filename: "[name].[contenthash].css",
            // chunkFilename: "[id].[contenthash].css"
            filename: assetsPath('css/[name].[hash].css'),
            chunkFilename: assetsPath('css/[name].[id].[hash].css')
        }),
        new OptimizeCssAssetsPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
            minSize: 30000,
            maxSize: 3000000,
            // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
            minChunks: 2, 
            // 表示按需加载文件时，并行请求的最大数目。默认为5。
            maxAsyncRequests: 5,
            // 表示加载入口文件时，并行请求的最大数目。默认为3。
            maxInitialRequests: 3,
            // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
            automaticNameDelimiter: '~',
            // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
            name: true,
            // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。默认将所有来自 node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 1,
                    name:'commons',
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    name:'base',
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
});
if (process.env.npm_config_report) {
    prdConfig.plugins.push(
        new BundleAnalyzerPlugin({
            // analyzerMode: 'server',
            // analyzerHost: '127.0.0.1',
            // analyzerPort: 8889,
            // reportFilename: 'report.html',
            // defaultSizes: 'parsed',
            // openAnalyzer: true,
            // generateStatsFile: false,
            // statsFilename: 'stats.json',
            // statsOptions: null,
            // logLevel: 'info',
        })
    );
}
module.exports = prdConfig;
