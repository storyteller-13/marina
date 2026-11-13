"use strict";

module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/pages/blog.html",
  },
  roots: ["<rootDir>/tests/js"],
  testMatch: ["**/*.test.js"],
  // This CLI adapter is exercised by the Python end-to-end generator test.
  collectCoverageFrom: ["public/js/**/*.js", "scripts/**/*.js", "!scripts/render-blog-posts.js"],
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
