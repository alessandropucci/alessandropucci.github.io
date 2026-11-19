(() => {
  const button = document.getElementById("cat-mode");
  const key = "portfolio-cat-mode";
  let enabled = true;
  try { enabled = localStorage.getItem(key) !== "off"; } catch {}

  function showCats(on) {
    document.documentElement.classList.toggle("cats-on", on);
    button.setAttribute("aria-pressed", String(on));
  }

  showCats(enabled);
  button.hidden = false;
  button.addEventListener("click", () => {
    const on = button.getAttribute("aria-pressed") !== "true";
    showCats(on);
    try { localStorage.setItem(key, on ? "on" : "off"); } catch {}
  });
  window.addEventListener("storage", event => {
    if (event.key === key || event.key === null) showCats(event.newValue !== "off");
  });
})();
