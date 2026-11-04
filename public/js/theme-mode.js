// Called from HTML (onclick).
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

globalThis.switchTheme = switchTheme;
globalThis.setTheme = setTheme;
globalThis.currentTheme = currentTheme;
