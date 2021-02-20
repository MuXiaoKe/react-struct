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
        port: 8000, // 端口
        proxy: {
            '*': {
                // target: 'http://172.16.4.42:20000/mock/5f3e48a6533fa705c171848f',  
                // target: 'http://10.221.20.74:32000',  // 准正式服务器地址
                target: 'http://172.16.4.244:32000/',  // 测试服务器地址
                pathRewrite: {'^/api': ''},
                secure: false,
                changeOrigin: true
            }
        }
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: path.join(__dirname, '../public/index.html'),
        //     favicon: 'public/favicon.ico'
        // }),
        // 自动导入模块 在全局 代替用import
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"]
        })
    ],
    devtool: 'eval-source-map'
});
