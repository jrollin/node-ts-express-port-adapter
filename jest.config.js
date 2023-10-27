// jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');

module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: 'node',
    testRegex: './src/.*\\.(test|spec)?\\.(ts|ts)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['<rootDir>/src'],
    coveragePathIgnorePatterns: ['<rootDir>/src/fixtures'],
    modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
    moduleNameMapper: pathsToModuleNameMapper(
        compilerOptions.paths /*, { prefix: '<rootDir>/' } */,
    ),
};
