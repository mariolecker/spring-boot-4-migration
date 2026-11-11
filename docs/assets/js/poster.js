// Sizes the print page so the whole page prints on one sheet.
(function () {
  "use strict";

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
