const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require("./webpack.base.config");
module.exports = merge(baseConfig,{
    devtool: 'none',
    mode: 'production',
    // 插件配置
    plugins: [
        new CleanWebpackPlugin(), // 每次打包前清空
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: path.join(__dirname, '../public/index.html')
        // }),
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
});