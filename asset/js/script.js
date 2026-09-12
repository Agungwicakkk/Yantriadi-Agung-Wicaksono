// Simple Vanilla JS for Mobile Nav Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Auto close on link click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
});

// Scroll reveal animation for sections and cards
document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll(
    "section[id], .pixel-card, .pixel-box, .pixel-terminal",
  );

  const driftTargets = document.querySelectorAll(
    ".tech-badge, .pixel-spark, .pixel-chip, .pixel-flag, .pixel-plane, .pixel-monster, .pixel-star",
  );

  const applyScrollMotion = () => {
    const midPoint = window.innerHeight * 0.52;

    revealTargets.forEach((element) => {
      if (!element.classList.contains("visible")) return;

      const rect = element.getBoundingClientRect();
      const progress =
        (midPoint - rect.top) / (window.innerHeight + rect.height);
      const floatOffset = Math.max(-18, Math.min(18, progress * 30));
      const tilt = Math.max(
        -5,
        Math.min(5, (rect.top / window.innerHeight) * 7),
      );

      element.style.setProperty("--scroll-shift", `${floatOffset}px`);
      element.style.setProperty("--scroll-tilt", `${tilt}deg`);
    });

    driftTargets.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const offsetY =
        ((window.innerHeight - rect.top) / window.innerHeight) * 18;
      const offsetX = (
        Math.sin(window.scrollY / 220 + rect.left * 0.05) * 10
      ).toFixed(2);
      const rotation = (
        Math.sin(window.scrollY / 180 + rect.top * 0.1) * 8
      ).toFixed(2);

      element.style.setProperty("--float-x", `${offsetX}px`);
      element.style.setProperty(
        "--float-y",
        `${Math.max(-12, Math.min(12, offsetY - 8))}px`,
      );
      element.style.setProperty("--float-rot", `${rotation}deg`);
    });
  };

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.classList.add(index % 2 === 0 ? "reveal-up" : "reveal-down");
    element.style.transitionDelay = `${index * 60}ms`;
  });

  driftTargets.forEach((element) => {
    element.classList.add("scroll-float");
  });

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => {
      element.classList.add("visible");
    });
    applyScrollMotion();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });

      applyScrollMotion();
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -20px 0px",
    },
  );

  revealTargets.forEach((element) => observer.observe(element));
  window.addEventListener("scroll", applyScrollMotion, { passive: true });
  window.addEventListener("resize", applyScrollMotion);
  applyScrollMotion();
});

// Contact form submit handler (was inline onsubmit)
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Message dispatched! Thank you for connecting.");
    });
  }
});
