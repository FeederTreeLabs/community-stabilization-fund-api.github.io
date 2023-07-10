module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^.+\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.cjs",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.cjs"
  },
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    "ts-jest": {
      jsx: "react-jsx",
      tsconfig: "tsconfig.jest.json"
    }
  }
};