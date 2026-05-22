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

  navToggle.addEventListener("click", () => {
    setNavOpen(!navLinks.classList.contains("active"));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setNavOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNavOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setNavOpen(false);
    }
  });
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
  }, { threshold: 0.14 });

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
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      productCards.forEach((card) => {
        const isVisible = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !isVisible);
        if (isVisible) {
          visibleCount += 1;
        }
      });

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    });
  });
}

const commoditySelect = document.querySelector("[data-commodity-select]");

if (commoditySelect) {
  const selectedProduct = new URLSearchParams(window.location.search).get("product");
  if (selectedProduct) {
    const matchingOption = Array.from(commoditySelect.options).find((option) => option.value === selectedProduct || option.text === selectedProduct);
    if (matchingOption) {
      commoditySelect.value = matchingOption.value;
    }
  }
}

const quoteForm = document.querySelector("#quote-form");
const formNote = document.querySelector("#form-note");

if (quoteForm && formNote) {
  quoteForm.addEventListener("submit", () => {
    formNote.textContent = "Preparing your export quote request...";
  });
}
