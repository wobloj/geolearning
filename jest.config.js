module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {},
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
  "/node_modules/(?!(axios|react-router|react-router-dom)/)", 
],
};
