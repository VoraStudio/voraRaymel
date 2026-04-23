/* ==========================================================================
   ANIMACIÓN: TRANSICIÓN DE FONDO
   Descripción: Cambia suavemente el color de fondo del body al hacer scroll.
   ========================================================================== */

// 1. Registro de Plugins necesarios
gsap.registerPlugin(ScrollTrigger, SplitText);
let posLogoBlanc = -(window.innerHeight + 100);
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

//El núbol sen va per el top ->
gsap.to(".hero__img", {
  yPercent: -50,
  opacity: 0,
  duration: 3,
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: ".hero__content",
    scrub: 1,
    start: "top top",
    end: "bottom top",
    invalidateOnRefresh: true,
  },
});
// Animació de degradat del titol del Hero ->
gsap.to(".hero__title", {
  "--fons-deg": "#a197c5",
  scrollTrigger: {
    trigger: ".hero__content",
    scrub: 1,
    start: "top 20%",
    end: "bottom top",
    invalidateOnRefresh: true,
  },
});

// Animació logo blanc - Negre
const tlBody = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "center 50%",
    end: "bottom top",
    scrub: 1,
  },
});
tlBody
  .to("body", { backgroundColor: "#39286c" })
  .to(".logo-dark", { opacity: 0 }, "<")
  .to(".logo-white", { opacity: 1 })
  .to(".header", { backgroundColor: "#39286c", duration: 0.2, delay: 1.5 }, "<");

/* ==========================================================================
   FIN ANIMACIÓN: TRANSICIÓN DE FONDO
   ========================================================================== */

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
