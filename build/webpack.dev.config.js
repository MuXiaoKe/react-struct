/* eslint-disable */
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        // compress: true,  // gzip压缩
        host: '0.0.0.0', // 允许ip访问
        hot: true, // 热更新
        port: 3401, // 端口
        proxy: {
            '*': {
                target: 'http://172.16.4.212:32000/', // 测试服务器地址
                // target: 'http://172.16.4.214:32000/', // 测试服务器地址
                pathRewrite: { '^/api': '' },
                secure: false,
                changeOrigin: true
            }
        }
    },
    plugins: [
        // 自动导入模块 在全局 代替用import
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"]
        }),
        new webpack.DefinePlugin({
            'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV)
        })
    ],
    devtool: 'eval-source-map',
    target: 'web'
});
