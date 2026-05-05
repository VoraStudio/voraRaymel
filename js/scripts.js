document.addEventListener("DOMContentLoaded", () => {
  // Registrar Plugins
  gsap.registerPlugin(ScrollTrigger, SplitText);

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
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sincronitzar ScrollTrigger amb Lenis
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

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
    const menuLinks = document.querySelectorAll(".header__menu-link");

    menuToggle.addEventListener("change", () => {
      const isOpen = menuToggle.checked;
      menuBtn.setAttribute("aria-label", isOpen ? "Tancar menú" : "Obrir menú");

      if (isOpen) {
        lenis.stop();
        gsap.to(menuLinks, {
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
        gsap.to(menuLinks, {
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

  const titolHero = new SplitText(".hero__title", { type: "chars, words, lines" });

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
      ".header__nav-link",
      {
        y: -20,
        opacity: 0,
        stagger: 0.3,
        duration: DURATION.NORMAL,
        ease: EASE,
      },
      "-=0.4",
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
          cleanup(document.querySelector(".hero__title"));
          // startTitleWave(); // Iniciem l'ona quan hagi acabat de plegar-se
        },
      },
      "-=1.5",
    )
    .from(
      ".hero__img",
      {
        y: -window.innerHeight,
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

  // Funció per iniciar l'ona sutil després de l'entrada
  // function startTitleWave() {
  //   gsap.to(titolHero.chars, {
  //     y: 10,
  //     duration: 0.8,
  //     repeat: -1,
  //     yoyo: true,
  //     ease: "sine.inOut",
  //     stagger: {
  //       each: 0.05,
  //       from: "start",
  //     },
  //   });
  // }

  // Funció per iniciar l'ona sutil de les lletres del títol del Hero
  function onaNubol() {
    gsap.to(".hero__img", {
      y: 100, // Ajustat a un valor sutil per a l'efecte de "núvol"
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

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

  /* ----- INICI ANIMACIONS SECCIONS ----- */
  const splitPlaer = new SplitText(".plaer__title", { type: "chars" });
  gsap.from(splitPlaer.chars, {
    y: 50,
    opacity: 0,
    stagger: 0.02,
    duration: DURATION.NORMAL,
    ease: EASE,
    scrollTrigger: {
      trigger: ".plaer",
      start: "top 70%",
    },
  });

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

  /* ----- ANIMACIÓ MASK SPLITTEXT SECCIÓ PLAER ----- */
  const splitChars = new SplitText(".plaer__title", { type: "chars, lines", mask: "lines" });
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
      // end: "+=200%",
      // pin: true,
      // scrub: 0.5,
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
  gsap.from(
    ".morph-container",
    {
      scale: 0,
      opacity: 0,
      duration: 3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".especial",
        start: "top 80%",
        end: "bottom 10%",
        // end: "+=200%",
        // pin: true,
        scrub: 0.5,
        toggleActions: "play none none reverse",
      },
    },
    "-=1",
  );
  // .to(
  //   ".special-bg",
  //   {
  //     clipPath: "circle(150% at 50% 50%)",
  //     ease: "none",
  //     duration: 5, // Augmentem el pes d'aquesta part perquè vagi més lent
  //   },
  //   "+=0.2",
  // );

  /* ----- INICI PARTÍCULES ----- */
  // function initParticles() {
  //   const container = document.getElementById("particles");
  //   if (!container) return;

  //   const numParticles = 30;
  //   for (let i = 0; i < numParticles; i++) {
  //     const p = document.createElement("div");
  //     p.className = "global__particle";

  //     const size = gsap.utils.random(2, 6);
  //     gsap.set(p, {
  //       x: gsap.utils.random(0, window.innerWidth),
  //       y: gsap.utils.random(0, window.innerHeight),
  //       width: size,
  //       height: size,
  //       opacity: gsap.utils.random(0.1, 0.4),
  //     });

  //     container.appendChild(p);

  //     gsap.to(p, {
  //       x: "+=" + gsap.utils.random(-100, 100),
  //       y: "+=" + gsap.utils.random(-100, 100),
  //       duration: gsap.utils.random(10, 20),
  //       repeat: -1,
  //       yoyo: true,
  //       ease: "sine.inOut",
  //     });
  //   }
  // }
  // ============================  ITEM  ======================================
  let mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    const tlItems = gsap.timeline({
      scrollTrigger: {
        trigger: ".items",
        start: "top top",
        end: () => `+=${window.innerHeight * 12}`,
        pin: true,
        /*toggleActions: "play none none reverse",*/
        //snap: { snapTo: 0.5, duration: 0.5, ease: "power1.inOut" },
        scrub: 0.5,
      },
    });
    let guixos = new SplitText(".Guixos h2", { type: "chars, lines", mask: "lines" });
    let guixosText = new SplitText(".Guixos .textItem", { type: "chars, lines", mask: "lines" });
    let ossets = new SplitText(".Ossets h2", { type: "chars, lines", mask: "lines" });
    let ossetsText = new SplitText(".Ossets .textItem", { type: "chars, lines", mask: "lines" });
    let perles = new SplitText(".Perles h2", { type: "chars, lines", mask: "lines" });
    let perlesText = new SplitText(".Perles .textItem", { type: "chars, lines", mask: "lines" });
    let fruites = new SplitText(".Fruites h2", { type: "chars, lines", mask: "lines" });
    let fruitesText = new SplitText(".Fruites .textItem", { type: "chars, lines", mask: "lines" });
    let fulles = new SplitText(".Fulles h2", { type: "chars, lines", mask: "lines" });
    let fullesText = new SplitText(".Fulles .textItem", { type: "chars, lines", mask: "lines" });
    let coles = new SplitText(".Coles h2", { type: "chars, lines", mask: "lines" });
    let colesText = new SplitText(".Coles .textItem", { type: "chars, lines", mask: "lines" });
    let maduixes = new SplitText(".Maduixes h2", { type: "chars, lines", mask: "lines" });
    let maduixesText = new SplitText(".Maduixes .textItem", { type: "chars, lines", mask: "lines" });
    let pols = new SplitText(".Pols h2", { type: "chars, lines", mask: "lines" });
    let polsText = new SplitText(".Pols .textItem", { type: "chars, lines", mask: "lines" });

    tlItems
      .to({}, { duration: 0.1 })
      .from(guixos.chars, { yPercent: 100, stagger: 0.02, duration: 0.3 })
      .from(
        guixosText.lines,
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
      .from(".Guixos .textFrase", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Guixos .comprar", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Guixos .boxImgItems", { autoAlpha: 0, scale: 0, duration: 1, ease: "power2.in" }, "<0.1")
      .from(".Guixos .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2, duration: 1.5 }, "<0.1")
      .to({}, { duration: 1 })

      // Sortida Guixos ->
      .to(guixos.chars, { yPercent: -100, stagger: 0.02, duration: 0.3, autoAlpha: 0 })
      .to(guixosText.lines, { stagger: 0.15, autoAlpha: 0, ease: "power2.out", rotationY: 110, x: 100 }, "<")
      .to(".Guixos .textFrase", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Guixos .comprar", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Guixos .boxImgItems", { autoAlpha: 0, scale: 0, ease: "power2.in" }, "<")
      .to(".Guixos .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2 }, "<")

      // Entrada Ossets ->
      .to(".Ossets", { autoAlpha: 1 }, "<")
      .from(ossets.chars, { yPercent: 100, stagger: 0.02, duration: 0.3 }, "<")
      .from(
        ossetsText.lines,
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
      .from(".Ossets .textFrase", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Ossets .comprar", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Ossets .boxImgItems", { autoAlpha: 0, scale: 0, duration: 1, ease: "power2.in" }, "<-0.5")
      .from(".Ossets .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2, duration: 2 }, "<0.2")
      .to(".Guixos", { autoAlpha: 0 }, ">")
      .to({}, { duration: 1 })

      // Sortida Ossets ->
      .to(ossets.chars, { yPercent: -100, stagger: 0.02, duration: 0.3, autoAlpha: 0 })
      .to(ossetsText.lines, { stagger: 0.15, autoAlpha: 0, ease: "power2.out", rotationY: 110, x: 100 }, "<")
      .to(".Ossets .textFrase", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Ossets .comprar", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Ossets .boxImgItems", { autoAlpha: 0, scale: 0, ease: "power2.in" }, "<")
      .to(".Ossets .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2 }, "<")

      //Entrada Perles
      .to(".Perles", { autoAlpha: 1 }, "<")
      .from(perles.chars, { yPercent: 100, stagger: 0.02, duration: 0.3 }, "<")
      .from(
        perlesText.lines,
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
      .from(".Perles .textFrase", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Perles .comprar", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Perles .boxImgItems", { autoAlpha: 0, scale: 0, duration: 1, ease: "power2.in" }, "<-0.5")
      .from(".Perles .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2, duration: 2 }, "<0.2")
      .to(".Ossets", { autoAlpha: 0 }, ">")
      .to({}, { duration: 1 })

      // Sortida Perles ->
      .to(perles.chars, { yPercent: -100, stagger: 0.02, duration: 0.3, autoAlpha: 0 })
      .to(perlesText.lines, { stagger: 0.15, autoAlpha: 0, ease: "power2.out", rotationY: 110, x: 100 }, "<")
      .to(".Perles .textFrase", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Perles .comprar", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Perles .boxImgItems", { autoAlpha: 0, scale: 0, ease: "power2.in" }, "<")
      .to(".Perles .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2 }, "<")

      // Fruites ->
      .to(".Fruites", { autoAlpha: 1 }, "<")
      .from(fruites.chars, { yPercent: 100, stagger: 0.02, duration: 0.3 }, "<")
      .from(
        fruitesText.lines,
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
      .from(".Fruites .textFrase", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Fruites .comprar", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Fruites .boxImgItems", { autoAlpha: 0, scale: 0, duration: 1, ease: "power2.in" }, "<-0.5")
      .from(".Fruites .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2, duration: 2 }, "<0.2")
      .to(".Perles", { autoAlpha: 0 }, ">")
      .to({}, { duration: 1 })

      // Sortida Fruites ->
      .to(fruites.chars, { yPercent: -100, stagger: 0.02, duration: 0.3, autoAlpha: 0 })
      .to(fruitesText.lines, { stagger: 0.15, autoAlpha: 0, ease: "power2.out", rotationY: 110, x: 100 }, "<0.3")
      .to(".Fruites .textFrase", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Fruites .comprar", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Fruites .boxImgItems", { autoAlpha: 0, scale: 0, ease: "power2.in" }, "<")
      .to(".Fruites .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2 }, "<")

      //Entrada Fulles
      .to(".Fulles", { autoAlpha: 1 }, "<")
      .from(fulles.chars, { yPercent: 100, stagger: 0.02, duration: 0.3 }, "<")
      .from(
        fullesText.lines,
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
      .from(".Fulles .textFrase", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Fulles .comprar", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Fulles .boxImgItems", { autoAlpha: 0, scale: 0, duration: 1, ease: "power2.in" }, "<-0.5")
      .from(".Fulles .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2, duration: 2 }, "<0.2")
      .to(".Fruites", { autoAlpha: 0 }, ">")
      .to({}, { duration: 1 })

      // Sortida Fulles ->
      .to(fulles.chars, { yPercent: -100, stagger: 0.02, duration: 0.3, autoAlpha: 0 })
      .to(fullesText.lines, { stagger: 0.15, autoAlpha: 0, ease: "power2.out", rotationY: 110, x: 100 }, "<")
      .to(".Fulles .textFrase", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Fulles .comprar", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Fulles .boxImgItems", { autoAlpha: 0, scale: 0, ease: "power2.in" }, "<")
      .to(".Fulles .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2 }, "<")

      // Entrada Coles ->
      .to(".Coles", { autoAlpha: 1 }, "<")
      .from(coles.chars, { yPercent: 100, stagger: 0.02, duration: 0.3 }, "<")
      .from(
        colesText.lines,
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
      .from(".Coles .textFrase", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Coles .comprar", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Coles .boxImgItems", { autoAlpha: 0, scale: 0, duration: 1, ease: "power2.in" }, "<-0.5")
      .from(".Coles .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2, duration: 2 }, "<0.2")
      .to(".Fulles", { autoAlpha: 0 }, ">")
      .to({}, { duration: 1 })

      // Sortida Coles ->
      .to(coles.chars, { yPercent: -100, stagger: 0.02, duration: 0.3, autoAlpha: 0 })
      .to(colesText.lines, { stagger: 0.15, autoAlpha: 0, ease: "power2.out", rotationY: 110, x: 100 }, "<")
      .to(".Coles .textFrase", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Coles .comprar", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Coles .boxImgItems", { autoAlpha: 0, scale: 0, ease: "power2.in" }, "<")
      .to(".Coles .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2 }, "<")

      // Entrada Maduixes ->
      .to(".Maduixes", { autoAlpha: 1 }, "<")
      .from(maduixes.chars, { yPercent: 100, stagger: 0.02, duration: 0.3 }, "<")
      .from(
        maduixesText.lines,
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
      .from(".Maduixes .textFrase", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Maduixes .comprar", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Maduixes .boxImgItems", { autoAlpha: 0, scale: 0, duration: 1, ease: "power2.in" }, "<-0.5")
      .from(".Maduixes .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2, duration: 2 }, "<0.2")
      .to(".Coles", { autoAlpha: 0 }, ">")
      .to({}, { duration: 1 })

      // Sortida Maduixes ->
      .to(maduixes.chars, { yPercent: -100, stagger: 0.02, duration: 0.3, autoAlpha: 0 })
      .to(maduixesText.lines, { stagger: 0.15, autoAlpha: 0, ease: "power2.out", rotationY: 110, x: 100 }, "<")
      .to(".Maduixes .textFrase", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Maduixes .comprar", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Maduixes .boxImgItems", { autoAlpha: 0, scale: 0, ease: "power2.in" }, "<")
      .to(".Maduixes .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2 }, "<")

      // Entrada Pols ->
      .to(".Pols", { autoAlpha: 1 }, "<")
      .from(pols.chars, { yPercent: 100, stagger: 0.02, duration: 0.3 }, "<")
      .from(
        polsText.lines,
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
      .from(".Pols .textFrase", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Pols .comprar", { autoAlpha: 0, y: 50, ease: "power2.in" }, "<0.1")
      .from(".Pols .boxImgItems", { autoAlpha: 0, scale: 0, duration: 1, ease: "power2.in" }, "<-0.5")
      .from(".Pols .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2, duration: 2 }, "<0.2")
      .to(".Maduixes", { autoAlpha: 0 }, ">")
      .to({}, { duration: 1 });

    /* Sortida Pols ->
      .to(pols.chars,{ yPercent: -100, stagger: 0.02, duration: 0.3, autoAlpha:0})
      .to(polsText.lines, { stagger: 0.15, autoAlpha: 0, ease: "power2.out",  rotationY: 110, x: 100,}, "<")
      .to(".Pols .textFrase", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Pols .comprar", { autoAlpha: 0, y: -50, ease: "power2.in" },"<")
      .to(".Pols .boxImgItems", { autoAlpha: 0, scale: 0, ease: "power2.in", },"<" )
      .to(".Pols .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2},"<")
      .to(".Pols", { autoAlpha: 0 }, ">")
      */
  });

  //Per mobil ->
  mm.add("(max-width: 767px)", () => {
    let currentLayer = 1;
    const layers = [".Guixos", ".Ossets", ".Perles", ".Fruites", ".Fulles", ".Coles", ".Maduixes", ".Pols"];
    const nextBtn = document.getElementById("next-item");
    const prevBtn = document.getElementById("prev-item");

    function updateLayers() {
      layers.forEach((layer, index) => {
        if (index + 1 === currentLayer) {
          gsap.set(layer, { display: "flex" });
          gsap.to(layer, { autoAlpha: 1, duration: 0.5 });
        } else {
          gsap.to(layer, {
            autoAlpha: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.set(layer, { display: "none" });
            },
          });
        }
      });
    }

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener("click", () => {
        currentLayer = currentLayer < layers.length ? currentLayer + 1 : 1;
        updateLayers();
      });

      prevBtn.addEventListener("click", () => {
        currentLayer = currentLayer > 1 ? currentLayer - 1 : layers.length;
        updateLayers();
      });
    }
  });

  // ============================  PARLEM  ======================================
  const tlparlem = gsap.timeline({
    scrollTrigger: {
      trigger: ".parlem",
      start: "top 80%",
      toggleActions: "play none none reverse",
      //markers:true
      //snap: { snapTo: 0.5, duration: 0.5, ease: "power1.inOut" },,
    },
  });
  let parlem = new SplitText(".boxParlem h1", { type: "chars, lines", mask: "lines" });
  let textos = gsap.utils.toArray(".boxParlem p");

  tlparlem
    .from(parlem.chars, { yPercent: 100, stagger: 0.05, duration: 0.7 })
    .from(textos, { autoAlpha: 0, y: 20, stagger: 0.3, ease: "power2.out" })
    .from(
      ".boxParlem2 img",
      {
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 3,
        ease: "power4.inOut",
      },
      "-=1",
    )
    //console.log("texttos ->>", textos)
    .from(".icon1", { rotation: 60, autoAlpha: 0, duration: 1.7 }, "<-0.3")
    .from(".icon2", { rotation: -60, autoAlpha: 0, duration: 1.7 }, "<-0.3");

  // ========================= FORM LOGIC ========================
  const contactForm = document.getElementById("contact-form-element");

  const showToast = (message, type = "success") => {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;

    const icons = {
      success: "✓",
      error: "✕",
      warning: "⚠",
    };

    toast.innerHTML = `
    <span class="toast__icon">${icons[type]}</span>
    <span class="toast__message">${message}</span>
  `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  };

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      if (!data.privacy) {
        showToast("Has d’acceptar la política de privadesa", "warning");
        return;
      }

      const btn = contactForm.querySelector(".form-btn");
      const btnText = btn.querySelector(".form-btn__text");
      const originalText = btnText.textContent;

      btn.disabled = true;
      btnText.textContent = "Enviant...";

      try {
        /*
      if (typeof grecaptcha !== 'undefined') {
        const token = await grecaptcha.execute('TU_SITE_KEY', {action: 'submit'});
        formData.append('recaptcha_response', token);
      }
      */
        await new Promise((resolve) => setTimeout(resolve, 2000));

        showToast("Missatge enviat correctament!", "success");
        contactForm.reset();
      } catch (error) {
        showToast("Error al enviar el missatge. Torna-ho a provar.", "error");
      } finally {
        btn.disabled = false;
        btnText.textContent = originalText;
      }

      /*
        const response = await fetch('contacte.php', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.status === 'success') {
        showToast('Missatge enviat correctament!', 'success');
        contactForm.reset();
      } else {
        showToast(result.message || 'Error al enviar el missatge.', 'error');
      }
    } catch (error) {
      showToast('Error de connexió. Torna-ho a provar.', 'error');
    } finally {
      btn.disabled = false;
      btnText.textContent = originalText;
    }
       */
    });

    //initParticles();
  }
});
