document.addEventListener("DOMContentLoaded", () => {
  // Registrar Plugins
  gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin);

  // Constants de disseny (Centralització)
  const DURATION = {
    FAST: 0.3,
    NORMAL: 0.6,
    SLOW: 1.2,
  };
  const EASE = "power3.out";

  /* ----- INICI LENIS (SMOOTH SCROLL) ----- */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    sync: true,
  });

  // Sincronitzar Lenis amb GSAP ticker (una sola font de veritat)
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Smooth Scroll per a enllaços interns amb Lenis
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = this.getAttribute("href");

      // Si el target és només "#", anem a dalt de tot
      if (target === "#") {
        e.preventDefault();
        lenis.start(); // Assegurem que Lenis està actiu
        lenis.scrollTo(0);
        return;
      }

      // Si el target és un ID vàlid a la pàgina actual
      if (target.startsWith("#") && target.length > 1) {
        const targetEl = document.querySelector(target);
        if (targetEl) {
          e.preventDefault();

          // Si el menú mòbil està obert, el tanquem primer
          const menuToggle = document.getElementById("menu-toggle");
          if (menuToggle && menuToggle.checked) {
            menuToggle.checked = false;
            // Emetem l'event change manualment per disparar la lògica de lenis.start()
            menuToggle.dispatchEvent(new Event("change"));
          }

          // Assegurem que Lenis està actiu abans de fer scroll
          lenis.start();

          // Donem un marge mínim perquè es tanqui el menú o es processi el canvi d'estat
          setTimeout(() => {
            lenis.scrollTo(targetEl, {
              offset: 0,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }, 50);
        }
      }
    });
  });

  /* ----- INICI HEADER & MENÚ ----- */
  // const header = document.querySelector(".header");
  const menuToggle = document.getElementById("menu-toggle");
  const menuBtn = document.getElementById("menu-btn");

  // ScrollTrigger.create({
  //   trigger: ".hero",
  //   start: "bottom 10%",
  //   onEnter: () => header.classList.add("header--scrolled"),
  //   onLeaveBack: () => header.classList.remove("header--scrolled"),
  // });

  /* ----- LOGICA MENU HAMBURGUESA ----- */
  if (menuToggle && menuBtn) {
    const menuItems = document.querySelectorAll(".header__menu-logo, .header__menu-link");

    menuToggle.addEventListener("change", () => {
      const isOpen = menuToggle.checked;
      menuBtn.setAttribute("aria-label", isOpen ? "Tancar menú" : "Obrir menú");

      if (isOpen) {
        lenis.stop();
        gsap.to(menuItems, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        });
      } else {
        lenis.start();
        gsap.to(menuItems, {
          opacity: 0,
          y: -20,
          scale: 0.95,
          duration: 0.3,
          stagger: { each: 0.05, from: "end" },
          ease: "power2.in",
        });
      }
    });
  }

  /* ----- INICI ANIMACIONS HERO ----- */
  const tlHero = gsap.timeline();

  const cleanup = (el) => {
    if (el) el.style.willChange = "auto";
  };

  const heroTitleEl = document.querySelector(".hero__title");
  if (heroTitleEl) {
    const titolHero = new SplitText(heroTitleEl, { type: "chars, words, lines" });

    // Entrada elements del Header ->
    tlHero
      .from(".header", { yPercent: -100, duration: DURATION.NORMAL, ease: EASE })
      .from(".header__logo", {
        x: -50,
        opacity: 0,
        duration: DURATION.SLOW,
        ease: EASE,
      })
      .from(
        ".header__nav-link:not(.header__nav-link--botiga)",
        {
          y: -20,
          opacity: 0,
          stagger: 0.3,
          duration: DURATION.NORMAL,
          ease: EASE,
          clearProps: "transform",
        },
        "-=0.4",
      )
      .from(
        ".header__nav-link--botiga",
        {
          opacity: 0,
          duration: DURATION.NORMAL,
          ease: EASE,
        },
        "-=0.2",
      )

      // -> Entrada del títol del Hero i les lletres
      .from(
        titolHero.chars,
        {
          y: 0,
          z: -150,
          rotateX: -90,
          opacity: 0,
          stagger: 0.09,
          duration: 1.2,
          ease: "power4.out",
          onComplete: () => {
            cleanup(heroTitleEl);
          },
        },
        "-=1.5",
      )
      .from(
        ".hero__img",
        {
          yPercent: -100,
          scale: 0.5,
          rotation: 160,
          opacity: 0,
          duration: 3.5,
          ease: "elastic.out(1, 0.75)",
          onComplete: () => onaNubol(),
        },
        "-=1.5",
      )
      .from(".hero__scroll-indicator", { opacity: 0, duration: DURATION.NORMAL }, "-=0.8");

    tlHero.eventCallback("onComplete", () => {
      document.querySelector(".header")?.classList.add("header--animated");
    });
  }

  // Funció per a la flotació de l'icona de testimonis
  function floatTestimonialIcon() {
    const icon = document.querySelector(".testimonials__shape-icon");
    if (icon) {
      gsap.to(icon, {
        y: 20,
        rotation: 3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }
  floatTestimonialIcon();

  // Animació Header per a pàgines sense Hero (com Productes)
  if (!document.querySelector(".hero__title") && document.querySelector(".header")) {
    const tlHeader = gsap.timeline();
    tlHeader
      .from(".header", { yPercent: -100, duration: DURATION.NORMAL, ease: EASE })
      .from(".header__logo", { x: -50, opacity: 0, duration: DURATION.SLOW, ease: EASE }, "-=0.2")
      .from(
        ".header__nav-link:not(.header__nav-link--botiga)",
        { y: -20, opacity: 0, stagger: 0.1, duration: DURATION.NORMAL, ease: EASE, clearProps: "transform" },
        "-=0.4",
      )
      .from(".header__nav-link--botiga", { opacity: 0, duration: DURATION.NORMAL, ease: EASE }, "-=0.2")
      .eventCallback("onComplete", () => {
        document.querySelector(".header")?.classList.add("header--animated");
      });
  }

  // Funció per iniciar l'ona sutil de les lletres del títol del Hero
  function onaNubol() {
    if (document.querySelector(".hero__img")) {
      gsap.to(".hero__img", {
        y: 100,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }

  if (document.querySelector(".hero")) {
    gsap.to(".hero__img", {
      yPercent: 40,
      filter: "blur(10px)",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".hero__title", {
      yPercent: -30,
      opacity: 0,
      filter: "blur(20px)",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  /* ----- INICI ANIMACIONS SECCIONS ----- */
  const plaerTitleEl = document.querySelector(".plaer__title");
  if (plaerTitleEl) {
    const splitChars = new SplitText(plaerTitleEl, { type: "chars, lines", mask: "lines" });
    gsap.from(splitChars.chars, {
      scrollTrigger: {
        trigger: ".plaer",
        start: "top 75%",
        toggleActions: "restart pause resume reverse",
      },
      yPercent: 110,
      stagger: 0.08,
      duration: 1.2,
      ease: "power4.out",
    });
  }

  const productesWrap = document.querySelector(".productes__wrap");
  if (productesWrap) {
    gsap.to(productesWrap, {
      x: () => -(productesWrap.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: ".productes",
        pin: true,
        scrub: 1,
        end: () => `+=${productesWrap.scrollWidth}`,
      },
    });
  }

  // HORIZONTAL SCROLL ITEMS (PRODUCTES.HTML) - DESACTIVAT PER USAR LA TIMELINE
  // const itemsWrap = document.querySelector(".items-wrap");
  // if (itemsWrap) {
  //   gsap.to(itemsWrap, {
  //     x: () => -(itemsWrap.scrollWidth - window.innerWidth),
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: "#items-scroll",
  //       pin: true,
  //       scrub: 1,
  //       end: () => `+=${itemsWrap.scrollWidth * 1.5}`, // Ajustem la durada del pin
  //       invalidateOnRefresh: true,
  //     },
  //   });
  // }

  /* ----- INICI ANIMACIÓ MORPH SECCIÓ PLAER ----- */
  if (document.getElementById("morph-svg")) {
    const tlMorph = gsap.timeline({
      defaults: {
        duration: 2.5,
        ease: "power2.inOut",
      },
      repeat: -1,
      repeatDelay: 0.5,
    });

    tlMorph
      .to("#maduixa", { morphSVG: "#ossets", duration: 3 })
      .to("#maduixa", { morphSVG: "#icone", duration: 3 })
      .to("#maduixa", { morphSVG: "#fruites", duration: 3 })
      .to("#maduixa", { morphSVG: "#perles", duration: 3 })
      .to("#maduixa", { morphSVG: "#fulles", duration: 3 })
      .to("#maduixa", { morphSVG: "#maduixa", duration: 3 });
  }

  const especialTitleEl = document.querySelector(".especial__title");
  if (especialTitleEl) {
    const frontalSelectors = ".especial__title, .especial__text, .especial__p";
    const splitEspecial = new SplitText(frontalSelectors, {
      type: "lines",
      mask: "lines",
    });

    gsap.set(".especial", { perspective: 1000 });

    const specialTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".especial",
        start: "top 60%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
      },
    });

    specialTL.from(splitEspecial.lines, {
      duration: 1,
      rotationX: -80,
      opacity: 0,
      force3D: true,
      transformOrigin: "top center -50",
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.from(".morph-container", {
      scale: 0,
      opacity: 0,
      duration: 3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".especial",
        start: "top 80%",
        end: "bottom 10%",
        scrub: 0.5,
        toggleActions: "play none none reverse",
      },
    });
  }

  // ============================  ITEM  ======================================
  let mm = gsap.matchMedia();
  const itemsEl = document.querySelector(".items");
  const PRODUCT_IDS = ["Guixos", "Ossets", "Perles", "Fruites", "Fulles", "Coles", "Maduixes", "Pols"];
  if (itemsEl) {
    mm.add("(min-width: 768px)", () => {
      const tlItems = gsap.timeline({
        scrollTrigger: {
          trigger: ".items",
          start: "top top",
          end: () => `+=${window.innerHeight * 12}`,
          pin: true,
          scrub: 0.5,
        },
      });

      // Gestió de Hash per saltar a producte concret
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          const items = PRODUCT_IDS.map((id) => `#${id}`);
          const index = items.indexOf(hash);
          if (index !== -1) {
            const scrollAmount = (window.innerHeight * 12 * index) / (items.length - 1);
            setTimeout(() => {
              window.scrollTo(0, scrollAmount + itemsEl.offsetTop);
            }, 100);
          }
        }
      }

      const products = PRODUCT_IDS.map((id) => {
        const h2Split = new SplitText(`.${id} h2`, { type: "chars, lines", mask: "lines" });
        const textSplit = new SplitText(`.${id} .textItem`, { type: "chars, lines", mask: "lines" });
        return {
          el: `.${id}`,
          chars: h2Split.chars,
          textLines: textSplit.lines,
        };
      });

      tlItems.set(".Guixos", { autoAlpha: 1 }).to({}, { duration: 1 });

      for (let i = 0; i < products.length - 1; i++) {
        const curr = products[i];
        const next = products[i + 1];
        const textPos = i === 3 ? "<0.3" : "<";

        tlItems
          .to(curr.chars, { yPercent: -100, stagger: 0.02, duration: 0.3, autoAlpha: 0 })
          .to(curr.textLines, { stagger: 0.15, autoAlpha: 0, ease: "power2.out", rotationY: 110, x: 100 }, textPos)
          .to(`${curr.el} .textFrase`, { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
          .to(`${curr.el} .comprar`, { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
          .to(`${curr.el} .boxImgItems`, { autoAlpha: 0, scale: 0, ease: "power2.in" }, "<")
          .to(`${curr.el} .boxImgItems img`, { rotationY: 360, autoAlpha: 0, scale: 0.2 }, "<")
          .to(next.el, { autoAlpha: 1 }, "<")
          .from(next.chars, { yPercent: 100, stagger: 0.02, duration: 0.3 }, "<")
          .from(
            next.textLines,
            {
              duration: 1.5,
              rotationY: -110,
              x: -100,
              autoAlpha: 0,
              transformOrigin: "left center -100",
              stagger: 0.15,
              ease: "power2.out",
              force3D: true,
            },
            "<0.3",
          )
          .from(`${next.el} .textFrase`, { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
          .from(`${next.el} .comprar`, { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
          .from(`${next.el} .boxImgItems`, { autoAlpha: 0, scale: 0, duration: 1, ease: "power2.in" }, "<-0.5")
          .from(`${next.el} .boxImgItems img`, { rotationY: 360, autoAlpha: 0, scale: 0.2, duration: 2 }, "<0.2")
          .to(curr.el, { autoAlpha: 0 }, ">")
          .to({}, { duration: 1 });
      }
    });

    //Per mobil ->
    mm.add("(max-width: 767px)", () => {
      let currentLayer = 1;
      const layers = PRODUCT_IDS.map((id) => `.${id}`);
      const nextBtn = document.getElementById("next-item");
      const prevBtn = document.getElementById("prev-item");

      function updateLayers(direction = 1) {
        layers.forEach((layer, index) => {
          const isEntering = index + 1 === currentLayer;
          const el = document.querySelector(layer);
          if (!el) return;

          if (isEntering) {
            gsap.set(el, {
              display: "flex",
              xPercent: direction * 100,
              autoAlpha: 0,
            });
            gsap.to(el, {
              xPercent: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power3.out",
            });
          } else if (el.style.display !== "none") {
            gsap.to(el, {
              xPercent: direction * -100,
              autoAlpha: 0,
              duration: 0.6,
              ease: "power3.inOut",
              onComplete: () => {
                gsap.set(el, { display: "none" });
              },
            });
          }
        });
      }

      if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => {
          currentLayer = currentLayer < layers.length ? currentLayer + 1 : 1;
          updateLayers(1);
        });

        prevBtn.addEventListener("click", () => {
          currentLayer = currentLayer > 1 ? currentLayer - 1 : layers.length;
          updateLayers(-1);
        });
      }
    });
  }

  const revealWrapperEl = document.querySelector(".reveal-wrapper");
  if (revealWrapperEl) {
    const tlparlem = gsap.timeline({
      scrollTrigger: {
        trigger: ".reveal-wrapper",
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 1,
      },
    });
    tlparlem
      // Sortida: Cada div cap al seu costat (Revela testimonis)
      .to(".box-pic1", {
        xPercent: -100,
        duration: 3.5,
        ease: "power3.in",
      })
      .to(
        ".box-pic2",
        {
          xPercent: 100,
          duration: 3.5,
          ease: "power3.in",
        },
        "<",
      )
      // Entrada de la forma blanca mentre s'obren les cortines
      .from(
        ".testimonials__shape-wrapper",
        {
          yPercent: 30,
          opacity: 0,
          duration: 5,
          ease: "power2.out",
          delay: 1,
        },
        "-=0.2", // Comença una mica abans que acabin d'obrir-se
      );
  }

  // ========================= FORM LOGIC ========================
  const contactForm = document.getElementById("contact-form-element");

  // SVG per a cada tipus de toast
  const TOAST_ICONS = {
    success:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>',
    error:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>',
    warning:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  };

  const showToast = (message, type = "success", duration = 4000) => {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <div class="toast__icon">${TOAST_ICONS[type]}</div>
      <p class="toast__message">${message}</p>
      <button class="toast__close" aria-label="Tancar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
      </button>
      <div class="toast__progress"></div>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add("show");
      });
    });

    const progress = toast.querySelector(".toast__progress");
    if (progress) {
      progress.style.transition = `width ${duration}ms linear`;
      requestAnimationFrame(() => {
        progress.style.width = "0%";
      });
    }

    const timeoutId = setTimeout(() => dismissToast(toast), duration);

    const closeBtn = toast.querySelector(".toast__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        clearTimeout(timeoutId);
        dismissToast(toast);
      });
    }
  };

  const dismissToast = (toast) => {
    if (toast.classList.contains("toast--dismissing")) return;
    toast.classList.add("toast--dismissing");
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  };

  // --- Submit handler ---
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const privacy = formData.get("privacy");

      if (!privacy) {
        showToast("Has d'acceptar la política de privadesa", "warning");
        return;
      }

      const btn = contactForm.querySelector(".contact-form__btn");
      const btnSpan = btn ? btn.querySelector("span") : null;
      const originalText = btnSpan ? btnSpan.textContent : "";

      if (btn) btn.disabled = true;
      if (btnSpan) btnSpan.textContent = "Enviant...";

      try {
        // reCAPTCHA v3: obtiene token con la site key inyectada por PHP
        const siteKey = window.RECAPTCHA_SITE_KEY;
        if (typeof grecaptcha !== "undefined" && grecaptcha.execute && siteKey && siteKey !== "POSA_AQUI_LA_TEUA_SITE_KEY") {
          try {
            const token = await grecaptcha.execute(siteKey, { action: "submit" });
            formData.set("recaptcha_response", token);
          } catch (e) {
            console.warn("reCAPTCHA no disponible, se omite:", e);
          }
        }

        const response = await fetch("php/contacte.php", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (result.ok) {
          showToast(result.message || "Missatge enviat correctament!", "success");
          contactForm.reset();
        } else {
          showToast(result.error || "Error en enviar el missatge.", "error");
        }
      } catch (error) {
        showToast("Error de connexió amb el servidor. Torna-ho a provar.", "error");
      } finally {
        if (btn) btn.disabled = false;
        if (btnSpan) btnSpan.textContent = originalText;
      }
    });
  }

  // Lògica per a l'slider de testimonis (canvi cíclic)
  const testimonialCards = gsap.utils.toArray(".testimonial-card");
  if (testimonialCards.length > 1) {
    let currentIdx = 0;

    const cycleTestimonials = () => {
      const nextIdx = (currentIdx + 1) % testimonialCards.length;

      // Sortida del actual
      gsap.to(testimonialCards[currentIdx], {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(testimonialCards[currentIdx], { visibility: "hidden" });
          // Entrada del següent
          gsap.set(testimonialCards[nextIdx], {
            visibility: "visible",
            y: 20,
          });
          gsap.to(testimonialCards[nextIdx], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
          currentIdx = nextIdx;
        },
      });
    };

    // Iniciem el cicle cada 5 segons
    setInterval(cycleTestimonials, 5000);
  }

  // Gestió de Hash al carregar la pàgina (general)
  const initialHash = window.location.hash;
  if (initialHash && !document.querySelector(".items")) {
    const targetEl = document.querySelector(initialHash);
    if (targetEl) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          lenis.scrollTo(targetEl, {
            offset: 0,
            duration: 1.5,
            immediate: false,
          });
        }, 500);
      });
    }
  }

  // --- CONTACT INFO SECTION ANIMATIONS ---
  const contactInfoSection = document.querySelector(".contact-info-section");
  if (contactInfoSection) {
    // Persiana effect on title lines (rotateX: -90 = closed blind)
    gsap.set(".contact-info-section .title-line", {
      opacity: 0,
      rotationX: -90,
      transformOrigin: "top center",
    });

    // Subtitle and right side start hidden
    gsap.set(".contact-info__subtitle, .contact-info__right, .contact-info__desc, .contact-info__contact-item", {
      opacity: 0,
      y: 30,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactInfoSection,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    // 1. Persiana: blinds open from top
    tl.to(".contact-info-section .title-line", {
      duration: 1.4,
      opacity: 1,
      rotationX: 0,
      ease: "power3.out",
      stagger: { each: 0.15, from: "start" },
    })
      // 2. Subtitle fades in
      .to(
        ".contact-info__subtitle",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.7",
      )
      // 3. Right column (desc + contact items)
      .to(
        ".contact-info__right",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .to(
        [".contact-info__desc", ".contact-info__contact-item"],
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4",
      );
  }

  // Floating icon animation (más sutil)
  const contactIcon = document.querySelector(".title-line__icon");
  if (contactIcon) {
    gsap.to(contactIcon, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  // Refresh ScrollTrigger after all loads
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  // Contact Banner Parallax
  const contactBannerImg = document.querySelector(".contact-info__banner-img");
  if (contactBannerImg) {
    gsap.to(contactBannerImg, {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: ".contact-info__banner",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // Contact Form Animations
  const contactFormSection = document.querySelector(".contact-form-section");
  if (contactFormSection) {
    const tlForm = gsap.timeline({
      scrollTrigger: {
        trigger: contactFormSection,
        start: "top 75%",
      },
    });

    // 1. Reveal Card
    tlForm.from(".contact-form__card", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // 2. Reveal Info Content (Left side of card)
    tlForm.from(
      [".contact-form__title", ".contact-form__subtitle", ".contact-form__detail", ".contact-form__social"],
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.6",
    );

    // 3. Reveal Form Groups (Right side of card)
    tlForm.from(
      ".contact-form__group",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.8",
    );
  }

  // ======================================================================
  // COOKIE BANNER RGPD
  // ======================================================================
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");

  const cookieConsent = localStorage.getItem("raymel_cookies");

  if (!cookieConsent) {
    setTimeout(() => {
      cookieBanner.classList.add("is-visible");
    }, 1000);
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("raymel_cookies", "accepted");
      cookieBanner.classList.remove("is-visible");
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      localStorage.setItem("raymel_cookies", "rejected");
      cookieBanner.classList.remove("is-visible");
    });
  }

  // Tancar selector d'idioma en fer clic fora
  document.addEventListener("click", (e) => {
    const langSwitcher = document.querySelector(".lang-switcher");
    if (langSwitcher && !langSwitcher.contains(e.target)) {
      langSwitcher.classList.remove("is-open");
    }
  });
});
