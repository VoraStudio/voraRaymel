document.addEventListener("DOMContentLoaded", function () {
  // 1. Registro de Plugins necesarios
  gsap.registerPlugin(ScrollTrigger, SplitText);
  let posLogoBlanc = -(window.innerHeight + 100);
  let mobil = window.innerWidth < 400;
  // ============================  HEADER  ======================================
  const tl = gsap.timeline();
  tl.from(".header__logo", { x: -150, duration: 1, opacity: 0 });
  tl.from(".header__nav-item", { y: -50, duration: 0.5, opacity: 0, stagger: 0.1, scale: 0.8 }, "<0.2");
  tl.from(".imgHeroBlanc", {
    y: posLogoBlanc,
    duration: 3,
    ease: "elastic.out(1, 1)",
    scale: 0.2,
    rotation: 360,
  });

  // ============================  HERO  ======================================
  document.fonts.ready.then(function () {
    gsap.set(".hero__title", { perspective: 1000, transformStyle: "preserve-3d" });
    if (mobil) document.querySelector(".hero__title").innerHTML = "Sweet<br>Sensations";
    let titol = new SplitText(".hero__title", { type: "lines, words, chars" });

    // revelació del Titol del Hero ->
    gsap.fromTo(
      titol.chars,
      {
        y: 100,
        z: -150,
        rotateX: -90,
        opacity: 0,
        stagger: 0.05,
      },
      {
        duration: 1,
        y: 0,
        rotateX: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "power4.out",
        delay: 1.5,
        onComplete: () => {
          gsap.set(".hero__title", { clearProps: "perspective" });
        },
      },
    );

    // Efecte de onda del Titol ->
    gsap.to(titol.chars, {
      y: -40,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.15,
        from: "start",
      },
      delay: 2,
    });

    //Animació de Degradadat ->
    gsap.to(titol.chars, {
      "--porcenatge-titol-Hero": "10%",
      "--porcenatge2-titol-Hero": "80%",
      duration: 2,
      stagger: 0.05,
      ease: "power2.inOut",
    });
  });

  // Animacions de surtida del titol i el nubol ->
  let tlHero = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero__content",
      scrub: 1,
      start: "top 30%",
      end: "bottom top",
      invalidateOnRefresh: true,
    },
  });
  //El núbol sen va per el top ->
  tlHero
    .to(".hero__img", {
      yPercent: -50,
      opacity: 0,
      duration: 3,
      ease: "power1.inOut",
      filter: "blur(150px)",
    })
    .to(".hero__title", { opacity: 0, ease: "power1.inOut", duration: 2, y: -150, filter: "blur(100px)" }, "<0.5");

  // Animació logo blanc - Negre
  const tlBody = gsap.timeline({
    scrollTrigger: {
      trigger: ".plaer",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
  tlBody
    .to("body", { backgroundColor: "#39286c" })
    .to(".logo-dark", { opacity: 0 }, "<1")
    .fromTo("body", { "--nav-hover": "var(--fons-violeta-hover)" }, { "--nav-hover": "var(--fons-clar-hover)" }, "<")
    .to(".logo-white", { opacity: 1 })
    .to(".header", { backgroundColor: "#39286c", duration: 0.2, delay: 1.5 }, "<");

  // ============================  PLAER  ========================================

  const plaer = new SplitText(".plaer__title", { type: "chars, words, lines", mask: "lines" });
  gsap.from(plaer.chars, {
    yPercent: 100,
    stagger: 0.1,
    opacity: 0,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: ".plaer",
      start: "top center",
      duration: 1,
      invalidateOnRefresh: true,
    },
  });

  // ============================  PRODUCTES  ======================================

  //Scroll Horizontal de productos ->
  let track = document.querySelector(".productes__wrap");
  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: ".productes",
      pin: true,
      scrub: 1,
      start: "top 5%",
      end: () => "+=" + track.scrollWidth,
      invalidateOnRefresh: true,
      markers: false,
    },
  });
});
