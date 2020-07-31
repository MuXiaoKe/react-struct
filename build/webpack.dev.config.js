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
                // target: 'http://172.16.2.121:8080/', // 陶海清
                // target: 'http://172.16.1.212:8080/', // 郑晨
                target: 'http://172.16.4.118:31008/', // 公司服务
                // target: 'http://172.16.2.138:8080/', // 王金龙
                secure: false,
                changeOrigin: true
            }
        }
    },

    devtool: 'eval-source-map'
});
