"use strict";

function resetDom(html = "") {
  document.documentElement.removeAttribute("data-color-mode");
  document.documentElement.removeAttribute("data-locale");
  document.documentElement.className = "";
  document.documentElement.lang = "en-us";
  document.head.innerHTML = "";
  document.body.className = "";
  document.body.innerHTML = html;
  localStorage.clear();
  delete window.MARINA_I18N_LISTS;
  delete window.MarinaI18n;
  delete window.MarinaBlog;
  delete window.MarinaBlogPost;
}

module.exports = { resetDom };
