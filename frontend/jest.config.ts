import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
    //setupFiles: ['<rootDir>/tests/unit/jest.init.ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
    moduleNameMapper: {
        '^Components/(.*)': '<rootDir>/src/components/$1',
        '^Exceptions/(.*)': '<rootDir>/src/exceptions/$1',
        '^Graphql/(.*)': '<rootDir>/src/graphql/$1',
        '^Mocks/(.*)': '<rootDir>/tests/unit/mocks/$1',
        '^Types': '<rootDir>/src/types',
    },
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    },
    collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts,vue}'],
};

export default config;
