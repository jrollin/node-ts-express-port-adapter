// jest.config.ts
module.exports = {
  verbose: true,
  transform:  {
    "\\.(ts)$": "ts-jest"
  },
  roots: [
    "<rootDir>/src/",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/fixtures",
  ]
}
