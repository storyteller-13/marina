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

test("keeps the browser theme-color in step with the theme", () => {
  document.head.innerHTML = '<meta name="theme-color" content="#1e2327">';
  localStorage.setItem("data-color-mode", "dark");
  require("../../public/js/theme-mode.js");
  const meta = document.querySelector('meta[name="theme-color"]');
  expect(meta.getAttribute("content")).toBe("#0d1117");
  window.switchTheme();
  expect(meta.getAttribute("content")).toBe("#ffffff");
  document.head.innerHTML = "";
});

test("data-theme-toggle elements switch the theme by click and keyboard", () => {
  resetDom(`
    <span id="span-toggle" tabindex="0" role="button" data-theme-toggle><b id="inner">x</b></span>
    <button id="btn-toggle" type="button" data-theme-toggle></button>
    <p id="other">no</p>`);
  localStorage.setItem("data-color-mode", "light");
  require("../../public/js/theme-mode.js");
  const mode = () => document.documentElement.getAttribute("data-color-mode");
  const key = (id, k) => {
    const e = new KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true });
    document.getElementById(id).dispatchEvent(e);
    return e;
  };

  document.getElementById("inner").click();
  expect(mode()).toBe("dark");
  document.getElementById("btn-toggle").click();
  expect(mode()).toBe("light");

  expect(key("span-toggle", "Enter").defaultPrevented).toBe(true);
  expect(mode()).toBe("dark");
  key("span-toggle", " ");
  expect(mode()).toBe("light");
  key("span-toggle", "a");
  expect(mode()).toBe("light");

  // Buttons get Enter/Space as a click from the browser; don't toggle twice.
  key("btn-toggle", "Enter");
  expect(mode()).toBe("light");

  document.getElementById("other").click();
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
  expect(mode()).toBe("light");
});
