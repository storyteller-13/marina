"use strict";

module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/pages/blog.html",
  },
  roots: ["<rootDir>/tests/js"],
  testMatch: ["**/*.test.js"],
  collectCoverageFrom: ["public/js/**/*.js", "scripts/**/*.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
