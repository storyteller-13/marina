"use strict";

function resetDom(html = "") {
  document.documentElement.removeAttribute("data-color-mode");
  document.documentElement.className = "";
  document.documentElement.lang = "en-us";
  document.head.innerHTML = "";
  document.body.className = "";
  document.body.innerHTML = html;
  localStorage.clear();
  delete window.MarinaBlog;
  delete window.MarinaBlogPost;
  delete window.MarinaHighlight;
}

module.exports = { resetDom };
