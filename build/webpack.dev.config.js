const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require("./webpack.base.config");
module.exports = merge(baseConfig, {
    mode: "development",
    devServer: {
        // compress: true,  // gzip压缩
        host: '0.0.0.0', // 允许ip访问
        hot: true, // 热更新
        port: 8000, // 端口
        proxy: {
            '*': {
                target: 'http://172.16.3.46:3000',
                secure: false,
                changeOrigin: true
            }
        }
    },

    devtool: "eval-source-map",
});
