module.exports = {
    extends: ['plugin:jest/recommended', 'plugin:jest/style'],
    plugins: ['jest'],
    rules: {
        'jest/no-hooks': 'off',
        'jest/require-hook': 'off',
        'sort-imports': ['off'],
    },
};
