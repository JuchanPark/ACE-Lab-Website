// SPACE Lab — shared site behavior
// Slowly pans the cosmic backdrop's background-position as the page scrolls,
// so it feels like the imagery drifts by rather than sitting perfectly still.
// The pan speed is tied to actual pixels scrolled (not to each page's own
// scroll range), so short pages like Home or News drift gently instead of
// racing through the same range in a few hundred pixels. It never needs to
// traverse the whole image top-to-bottom to read as motion.
(function () {
  var bg = document.querySelector(".cosmic-bg");
  if (!bg) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  var MIN_PCT = 6;
  var MAX_PCT = 26;
  var PX_FOR_FULL_RANGE = 2600; // scrolling this many px pans through the full range
  var ticking = false;

  function update() {
    var frac = Math.min(1, Math.max(0, window.scrollY / PX_FOR_FULL_RANGE));
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
