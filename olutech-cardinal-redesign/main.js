const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (nav && navToggle && navLinks) {
  const setNavOpen = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    navLinks.classList.toggle("active", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  };
  navToggle.addEventListener("click", () => setNavOpen(!navLinks.classList.contains("active")));
  navLinks.addEventListener("click", (event) => { if (event.target.closest("a")) setNavOpen(false); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setNavOpen(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 920) setNavOpen(false); });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("show"));
}

const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll("[data-category]");
const emptyState = document.querySelector("[data-empty-state]");
if (filterButtons.length && productCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      productCards.forEach((card) => {
        const visible = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !visible);
        if (visible) visibleCount += 1;
      });
      if (emptyState) emptyState.hidden = visibleCount > 0;
    });
  });
}

const commoditySelect = document.querySelector("[data-commodity-select]");
if (commoditySelect) {
  const selectedProduct = new URLSearchParams(window.location.search).get("product");
  if (selectedProduct) {
    const option = Array.from(commoditySelect.options).find((item) => item.value === selectedProduct || item.text === selectedProduct);
    if (option) commoditySelect.value = option.value;
  }
}

const quoteForm = document.querySelector("#quote-form");
const formNote = document.querySelector("#form-note");
if (quoteForm && formNote) {
  quoteForm.addEventListener("submit", () => {
    formNote.textContent = "Preparing your export quote request...";
  });
}

// Homepage hero slideshow inspired by the image-led presentation on Cardinal Torch.
const heroSlider = document.querySelector('[data-hero-slider]');
if (heroSlider) {
  const slides = Array.from(heroSlider.querySelectorAll('[data-hero-slide]'));
  const dots = Array.from(heroSlider.querySelectorAll('[data-hero-dot]'));
  const prev = heroSlider.querySelector('[data-hero-prev]');
  const next = heroSlider.querySelector('[data-hero-next]');
  let current = 0;
  let timer;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  };

  const start = () => {
    window.clearInterval(timer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = window.setInterval(() => showSlide(current + 1), 6500);
    }
  };

  prev?.addEventListener('click', () => { showSlide(current - 1); start(); });
  next?.addEventListener('click', () => { showSlide(current + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); start(); }));
  heroSlider.addEventListener('mouseenter', () => window.clearInterval(timer));
  heroSlider.addEventListener('mouseleave', start);
  showSlide(0);
  start();
}
