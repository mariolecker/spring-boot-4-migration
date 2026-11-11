// High-contrast toggle, and sizing of the print page.
(function () {
  "use strict";

  // High-contrast theme: light code boxes with dark text. The choice is
  // remembered in this browser; an inline script in <head> applies it early.
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  function apply(on) {
    if (on) root.dataset.theme = "contrast"; else delete root.dataset.theme;
    if (toggle) toggle.setAttribute("aria-pressed", on ? "true" : "false");
  }
  apply(root.dataset.theme === "contrast");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var on = root.dataset.theme !== "contrast";
      apply(on);
      try { localStorage.setItem("theme", on ? "contrast" : "default"); } catch (e) {}
    });
  }

  // Print as a single page sized to the poster.
  var pageStyle = document.createElement("style");
  document.head.appendChild(pageStyle);
  window.addEventListener("beforeprint", function () {
    var poster = document.querySelector(".poster");
    var previous = poster.style.width;
    poster.style.width = "1600px";
    var h = Math.ceil(poster.getBoundingClientRect().height) + 24;
    poster.style.width = previous;
    pageStyle.textContent = "@page { size: 1600px " + h + "px; margin: 0; }";
  });

})();
