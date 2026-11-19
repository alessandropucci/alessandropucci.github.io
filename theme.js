(() => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  let choice;
  try { choice = localStorage.getItem("portfolio-theme"); } catch {}

  function applyTheme() {
    const dark = choice === "dark" || (choice !== "light" && preference.matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.getElementById("theme")?.setAttribute("aria-pressed", String(dark));
    document.dispatchEvent(new Event("portfolio-theme-change"));
  }

  applyTheme();
  preference.addEventListener("change", applyTheme);
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("theme");
    button.hidden = false;
    applyTheme();
    button.addEventListener("click", () => {
      choice = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem("portfolio-theme", choice); } catch {}
      applyTheme();
    });
  });
})();
