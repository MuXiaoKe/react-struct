module.exports = {
    extends: ['alloy', 'alloy/react', 'alloy/typescript', 'plugin:prettier/recommended'],
    settings: {
        'import/resolver': {
            // 引用路径的快捷方式
            webpack: {
                config: './build/webpack.base.config.js'
            }
        }
    },
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        // jQuery: false,
        // $: false
    },
    rules: {
        'react/jsx-fragments': 0,
        quotes: ['off', 'single'],
        'jsx-quotes': 0,
        'prettier/prettier': 'error',
        'default-case-last': ['warn'], // switch 语句中的 default 必须在最后
        'no-useless-backreference': ['off'], // 禁止正则表达式中出现无用的回溯引用
        'no-unused-vars': ['warn'], // 已定义的变量必须使用
        'no-extra-boolean-cast': ['off'], // 禁止不必要的布尔类型转换
        'no-invalid-this': 'off', // 禁止在类之外的地方使用 this
        '@typescript-eslint/no-invalid-this': ['warn'], // [error]
        'no-return-assign': ['warn'], // 禁止在 return 语句里赋值
        'prefer-promise-reject-errors': 'off', // Promise 的 reject 中必须传入 Error 对象，而不是字面量
        'jsx-no-useless-fragment': 'off',
        'no-loss-of-precision': 'off',
        complexity: 'off', // 函数得最大复杂数
        '@typescript-eslint/consistent-type-definitions': ['off'], // 用type或者interface定义对象
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        'max-depth': ['error', 6]
    },
    plugins: ['prettier', 'react-hooks']
};
