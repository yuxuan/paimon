module.exports = {
    'extends': require.resolve('@reskript/config-lint/config/eslint'),
    'plugins': [
        'import',
    ],
    'rules': {
        'camelcase': 'off',
        'react/jsx-no-bind': 'off',
    },
};
