/* =========================================================
   Amazon.in Clone - JavaScript
   1. Hero slider (auto-play, arrows, dots, swipe)
   2. Search bar demo message
   3. Back to top
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  initSlider();
  initSearch();
  initBackToTop();
});

/* ---------- 1. Hero slider ---------- */
function initSlider() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const slides = hero.querySelectorAll(".slide");
  const dots = hero.querySelectorAll(".dot");
  const prevBtn = hero.querySelector(".prev");
  const nextBtn = hero.querySelector(".next");
  const AUTO_DELAY = 5000; // 5 seconds

  let current = 0;
  let timer = null;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === current);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === current);
    });
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function prevSlide() {
    showSlide(current - 1);
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(nextSlide, AUTO_DELAY);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  // Arrow buttons
  nextBtn.addEventListener("click", function () {
    nextSlide();
    startAuto();
  });
  prevBtn.addEventListener("click", function () {
    prevSlide();
    startAuto();
  });

  // Dots
  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      showSlide(i);
      startAuto();
    });
  });

  // Pause when mouse is over the slider
  hero.addEventListener("mouseenter", stopAuto);
  hero.addEventListener("mouseleave", startAuto);

  // Swipe support for phones / tablets
  let touchStartX = 0;
  hero.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );
  hero.addEventListener(
    "touchend",
    function (e) {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) nextSlide();
        else prevSlide();
        startAuto();
      }
    },
    { passive: true }
  );

  // Keyboard arrows while focus is on the slider buttons
  hero.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  showSlide(0);
  startAuto();
}

/* ---------- 2. Search bar ---------- */
function initSearch() {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  const category = document.getElementById("searchCategory");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // no backend yet, so we only show a message
    const text = input.value.trim();

    if (text === "") {
      input.focus();
      showToast("Please type something to search.");
      return;
    }

    const categoryName = category.options[category.selectedIndex].text;
    showToast('Searching "' + text + '" in ' + categoryName + " (demo)");
  });
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}

/* ---------- 3. Back to top ---------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
