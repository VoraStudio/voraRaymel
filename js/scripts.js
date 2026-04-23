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

// 2. Definición de la animación de fondo
gsap.to("body", {
  backgroundColor: "#39286c", // Representa --fons-violeta
  scrollTrigger: {
    trigger: ".hero",
    start: "center 50%",
    end: "bottom top",
    scrub: 1, // Suavizado de 1 segundo para la transición
    markers: false, // Cambiar a true para depuración
  },
});

/* ==========================================================================
   FIN ANIMACIÓN: TRANSICIÓN DE FONDO
   ========================================================================== */

let track = document.querySelector(".productes__wrap");
gsap.to(track, {
  // Movemos el track hacia la izquierda
  // Calculamos: (Ancho total del track - Ancho de 1 pantalla)
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".productes",
    pin: true, // Bloquea la pantalla mientras ocurre la animación
    scrub: 1, // El movimiento sigue al dedo/ratón
    start: "top top",
    end: () => "+=" + track.scrollWidth, // La duración del scroll depende del ancho de la galería
    invalidateOnRefresh: true, // Recalcula si cambias el tamaño de la ventana
  },
});
