/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 新版本的css代码压缩包
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
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
        new MiniCssExtractPlugin({
            // 压缩css
            // filename: "[name].[contenthash].css",
            // chunkFilename: "[id].[contenthash].css"
            filename: assetsPath('css/[name].[contenthash].css'),
            chunkFilename: assetsPath('css/[name].[id].[contenthash].css')
        }),
        // new OptimizeCssAssetsPlugin()
        new webpack.DefinePlugin({
            'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV)
        })
    ],
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`,
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            // 重复打包问题
            cacheGroups: {
                vendors: {
                    //node_modules里的代码
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    // name: 'vendors', //chunks name 不能设置这个名字，不然会全部打包到这个文件里面
                    priority: 10, //优先级
                    enforce: true
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
