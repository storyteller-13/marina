function switchTheme() {
  setTheme(currentTheme() === 'light' ? 'dark' : 'light');
}

function setTheme(style) {
  document.querySelectorAll('.isInitialToggle').forEach(elem => {
    elem.classList.remove('isInitialToggle');
  });
  document.documentElement.setAttribute('data-color-mode', style);
  localStorage.setItem('data-color-mode', style);
  // Keep the mobile browser's toolbar in step with the page background.
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', style === 'dark' ? '#0d1117' : '#ffffff');
}

function currentTheme() {
  const localStyle = localStorage.getItem('data-color-mode');
  const systemStyle = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return localStyle || systemStyle;
}

setTheme(currentTheme());

// Any element marked data-theme-toggle switches the theme. This script runs in <head> before the
// toggles exist, so listen on the document. Enter/Space make the non-<button> toggle keyboard-operable.
function handleThemeToggle(event) {
  const toggle = event.target instanceof Element && event.target.closest("[data-theme-toggle]");
  if (!toggle) return;
  if (event.type === "keydown") {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (toggle.tagName === "BUTTON") return; // a native button already turns these keys into a click
    event.preventDefault();
  }
  switchTheme();
}

document.addEventListener("click", handleThemeToggle);
document.addEventListener("keydown", handleThemeToggle);

globalThis.switchTheme = switchTheme;
globalThis.setTheme = setTheme;
globalThis.currentTheme = currentTheme;
