/* eslint-disable */
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
    // devtool: 'none',
    mode: 'production',
    // 插件配置
    plugins: [
        new CleanWebpackPlugin(), // 每次打包前清空
        new MiniCssExtractPlugin({ // 提取css到新文件
            filename: assetsPath("css/[name].[contenthash].css"),
            chunkFilename: assetsPath("css/[id].[contenthash].css")
        }),
        // 压缩
        new OptimizeCssAssetsPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
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
