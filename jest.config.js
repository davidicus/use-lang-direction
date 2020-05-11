module.exports = {
  globals: {
    __DEV__: false,
  },
  setupFiles: ["<rootDir>/config/jest/setup.js"],
  testURL: "http://localhost",
  testPathIgnorePatterns: ["/dist/"],
  watchPathIgnorePatterns: ["/dist/"],
};
