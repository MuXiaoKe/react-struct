const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require("./webpack.base.config");
module.exports = merge(baseConfig, {
    mode: "development",
    devServer: {
        // compress: true,  // gzip压缩
        host: '0.0.0.0', // 允许ip访问
        hot: true, // 热更新
        port: 8000 // 端口
    },

    devtool: "eval-source-map",
});
