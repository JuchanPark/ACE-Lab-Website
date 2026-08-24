// SPACE Lab — shared site behavior
// Slowly pans the cosmic backdrop's background-position as the page scrolls,
// so it feels like the imagery drifts by rather than sitting perfectly still.
// The pan is normalized to each page's own scroll range, so it never needs
// to traverse the whole image top-to-bottom to read as motion.
(function () {
  var bg = document.querySelector(".cosmic-bg");
  if (!bg) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  var MIN_PCT = 8;
  var MAX_PCT = 55;
  var ticking = false;

  function update() {
    var doc = document.documentElement;
    var maxScroll = doc.scrollHeight - window.innerHeight;
    var frac = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    var pct = MIN_PCT + frac * (MAX_PCT - MIN_PCT);
    bg.style.backgroundPositionY = pct + "%";
    ticking = false;
  }

  update();
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener("resize", update);
})();
