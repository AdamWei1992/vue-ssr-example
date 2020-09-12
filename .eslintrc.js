
module.exports = {
    root: true,
    extends: ['plugin:vue/base', 'plugin:vue/essential'],
    plugins: ['vue-libs'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6,
        sourceType: 'module'
    },
    env: {
        es6: true,
        browser: true,
    },
    rules: {
        'indent': [2, 4],
        'vue/html-indent': [2, 4]
    }
}
