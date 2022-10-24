module.exports = {
    root: true,
    env: {
        browser: true,
        es2022: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        '@vue/typescript/recommended',
        'prettier',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'no-undef': 'off',
        'prefer-template': 'error',
        'vue/no-v-for-template-key': 'off',
        'vue/no-v-model-argument': 'off',
        'vue/prefer-template': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                trailingComma: 'es5',
                tabWidth: 4,
                semi: true,
                singleQuote: true,
                printWidth: 100,
            },
        ],
        'sort-imports': [
            'error',
            {
                ignoreCase: false,
                ignoreDeclarationSort: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                allowSeparatedGroups: false,
            },
        ],
    },
};
