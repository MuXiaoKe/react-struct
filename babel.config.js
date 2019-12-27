const babelConfig = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3,
                modules: false
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties', // 修复箭头函数
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css' // `style: true` 会加载 less 文件
            }
        ]
    ]
};
module.exports = babelConfig;
