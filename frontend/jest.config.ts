import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
    moduleNameMapper: {
        '^Components/(.*)': '<rootDir>/src/components/$1',
        '^Exceptions/(.*)': '<rootDir>/src/exceptions/$1',
        '^Graphql/(.*)': '<rootDir>/src/graphql/$1',
        '^Services/(.*)': '<rootDir>/src/services/$1',
        '^Mocks/(.*)': '<rootDir>/tests/unit/mocks/$1',
        '^Types': '<rootDir>/src/types',
    },
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!lodash-es|date-fns|@vueform|(vue-loading-overlay/src))',
    ],
    collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts,vue}'],
};

export default config;
