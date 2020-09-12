module.exports = {
    // 'presets': ['@babel/preset-env'],
    'plugins': ['transform-vue-jsx', '@babel/plugin-transform-runtime'],
    'env': {
        'browser': {
            'presets': [
                [
                    '@babel/preset-env',
                    {
                        'targets': {
                            'browsers': ['last 2 versions', 'safari > 7']
                        }
                    }
                ]
            ]
        },
        'node': {
            'presets': [
                [
                    '@babel/preset-env',
                    {
                        'targets': {
                            'node': 'current'
                        }
                    }
                ]
            ]
        }
    }
}
