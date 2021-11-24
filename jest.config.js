
module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  modulePathIgnorePatterns: ["<rootDir>/.docker"],
  testRegex: '(test/unit/.*|(\\.|/)(test|spec))\\.ts?$',
  "verbose": true,
    "bail": false,
    "collectCoverage": false,
    "preset": "ts-jest",
    "collectCoverageFrom": [
      "src/**/*.ts"
    ],
    "coverageReporters": [
      "json",
      "json-summary",
      "lcov",
      "text",
      "clover"
    ],
    "moduleFileExtensions": [
      "js",
      "ts",
      "json",
      "node"
    ],
    "testEnvironment": "node",
    "moduleNameMapper": {
      "@domain/(.*)": "<rootDir>/src/1-domain/$1",
      "@business/(.*)": "<rootDir>/src/2-business/$1",
      "@controller/(.*)": "<rootDir>/src/3-controller/$1",
      "@framework/(.*)": "<rootDir>/src/4-framework/$1",
      "@shared/(.*)": "<rootDir>/src/shared/$1",
      "@test/(.*)": "<rootDir>/test/$1"
}
}