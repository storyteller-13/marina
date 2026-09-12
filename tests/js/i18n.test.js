"use strict";

const { resetDom } = require("./helpers");

function chromeHtml() {
  return `
    <div class="profile-color-modes">
      <span class="profile-color-modes-toggle js-promo-color-modes-toggle"></span>
    </div>
    <div class="mobile-nav-sticky"></div>
    <p data-i18n="nav.blog">blog</p>
    <p data-i18n></p>
    <div data-i18n-html="home.easter">easter egg →</div>
    <div data-i18n-html></div>
    <button data-i18n-aria="blog.copyAria">copy</button>
    <button data-i18n-aria></button>
  `;
}

beforeEach(() => {
  resetDom(chromeHtml());
  jest.resetModules();
  jest.restoreAllMocks();
});

test("init applies stored locale, translations, and selector wiring", () => {
  localStorage.setItem("marina-locale", "ja");
  require("../../public/js/i18n.js");
  const i18n = window.MarinaI18n;

  expect(i18n.getLocale()).toBe("ja");
  expect(document.documentElement.lang).toBe("ja");
  expect(document.getElementById("marina-font-jp")).not.toBeNull();
  expect(document.querySelector("[data-i18n='nav.blog']").textContent).toBe("ブログ");
  expect(document.querySelectorAll(".lang-toggle").length).toBeGreaterThan(1);

  i18n.ensureJpFont();
  expect(document.querySelectorAll("#marina-font-jp")).toHaveLength(1);

  i18n.mountSelectors();
  expect(document.querySelectorAll(".lang-toggle").length).toBeGreaterThan(1);
});

test("setLocale toggles, rejects unknown values, and survives storage failures", () => {
  require("../../public/js/i18n.js");
  const i18n = window.MarinaI18n;

  i18n.setLocale("ja");
  expect(i18n.getLocale()).toBe("ja");
  i18n.setLocale("nope");
  expect(i18n.getLocale()).toBe("en");
  expect(document.documentElement.lang).toBe("en-us");

  const toggle = document.querySelector(".lang-toggle");
  toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  expect(i18n.getLocale()).toBe("ja");

  toggle.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  expect(i18n.getLocale()).toBe("en");
  toggle.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
  expect(i18n.getLocale()).toBe("ja");
  toggle.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
  expect(i18n.getLocale()).toBe("ja");

  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  i18n.setLocale("en");
  expect(i18n.getLocale()).toBe("en");
});

test("t() falls back across locale dictionaries", () => {
  window.MARINA_I18N_LISTS = { en: { "test.onlyen": "EN-ONLY" }, ja: { "extra.ja": "JA" } };
  require("../../public/js/i18n.js");
  const i18n = window.MarinaI18n;
  expect(i18n.t("extra.ja")).toBe("extra.ja");
  i18n.setLocale("ja");
  expect(i18n.t("extra.ja")).toBe("JA");
  expect(i18n.t("test.onlyen")).toBe("EN-ONLY");
  expect(i18n.t("missing.key")).toBe("missing.key");
  document.documentElement.setAttribute("data-locale", "fr");
  expect(i18n.t("nav.blog")).toBe("blog");
  document.documentElement.removeAttribute("data-locale");
  expect(i18n.getLocale()).toBe("en");
  expect(i18n.t("nav.blog")).toBe("blog");
  i18n.applyLocale("nope");
  expect(i18n.getLocale()).toBe("en");
});

test("readStoredLocale ignores bad values and storage errors", () => {
  localStorage.setItem("marina-locale", "de");
  require("../../public/js/i18n.js");
  expect(window.MarinaI18n.readStoredLocale()).toBe("en");

  jest.resetModules();
  resetDom(chromeHtml());
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  require("../../public/js/i18n.js");
  expect(window.MarinaI18n.readStoredLocale()).toBe("en");
});

test("mountSelectors appends when no theme toggle exists and handles 404", () => {
  resetDom('<div class="profile-color-modes"></div>');
  require("../../public/js/i18n.js");
  expect(document.querySelector(".profile-color-modes .lang-toggle")).not.toBeNull();

  jest.resetModules();
  resetDom(`
    <div class="profile-color-modes">
      <span class="profile-color-modes-toggle"></span>
    </div>
  `);
  require("../../public/js/i18n.js");
  expect(document.querySelector(".profile-color-modes .lang-toggle")).not.toBeNull();

  jest.resetModules();
  resetDom("");
  document.body.className = "error-404";
  require("../../public/js/i18n.js");
  expect(document.querySelector(".lang-slot--404")).not.toBeNull();

  window.MarinaI18n.mountSelectors();
  expect(document.querySelectorAll(".lang-slot--404")).toHaveLength(1);

  jest.resetModules();
  resetDom(chromeHtml());
  document.body.classList.add("error-404");
  require("../../public/js/i18n.js");
  expect(document.querySelector(".lang-slot--404")).toBeNull();
});

test("initI18n without extra lists still boots", () => {
  require("../../public/js/i18n.js");
  expect(document.documentElement.classList.contains("i18n-ready")).toBe(true);

  window.MARINA_I18N_LISTS = {};
  window.MarinaI18n.initI18n();
  window.MARINA_I18N_LISTS = { en: { "extra.en": "E" } };
  window.MarinaI18n.initI18n();
  expect(window.MarinaI18n.t("extra.en")).toBe("E");
});

test("defers init until DOMContentLoaded when document is still loading", () => {
  jest.resetModules();
  resetDom(chromeHtml());
  Object.defineProperty(document, "readyState", {
    configurable: true,
    get: () => "loading",
  });
  require("../../public/js/i18n.js");
  expect(document.querySelector(".lang-toggle")).toBeNull();
  document.dispatchEvent(new Event("DOMContentLoaded"));
  expect(document.querySelector(".lang-toggle")).not.toBeNull();
  delete document.readyState;
});
