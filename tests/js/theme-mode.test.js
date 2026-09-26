"use strict";

const { resetDom } = require("./helpers");

beforeEach(() => {
  resetDom('<span class="isInitialToggle">x</span>');
  jest.resetModules();
});

test("prefers stored theme over system preference", () => {
  localStorage.setItem("data-color-mode", "dark");
  require("../../public/js/theme-mode.js");
  expect(window.currentTheme()).toBe("dark");
  expect(document.documentElement.getAttribute("data-color-mode")).toBe("dark");
  expect(document.querySelector(".isInitialToggle")).toBeNull();
});

test("falls back to system dark when nothing is stored", () => {
  window.matchMedia = jest.fn().mockReturnValue({ matches: true });
  require("../../public/js/theme-mode.js");
  expect(window.currentTheme()).toBe("dark");
});

test("falls back to light when matchMedia is missing", () => {
  delete window.matchMedia;
  require("../../public/js/theme-mode.js");
  expect(window.currentTheme()).toBe("light");
  expect(document.documentElement.getAttribute("data-color-mode")).toBe("light");
});

test("falls back to light when system preference is light", () => {
  window.matchMedia = jest.fn().mockReturnValue({ matches: false });
  require("../../public/js/theme-mode.js");
  expect(window.currentTheme()).toBe("light");
});

test("switchTheme toggles light and dark", () => {
  localStorage.setItem("data-color-mode", "light");
  require("../../public/js/theme-mode.js");
  window.switchTheme();
  expect(document.documentElement.getAttribute("data-color-mode")).toBe("dark");
  window.switchTheme();
  expect(document.documentElement.getAttribute("data-color-mode")).toBe("light");
});
