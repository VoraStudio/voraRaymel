# Pla d'Integració i Correccions - voraRaymel

## Resum
Integrar la secció "Especial" de la versió Raymel amb totes les animacions GSAP, i corregir tots els errors identificats.

---

## 1. CORRECCIONS CSS (`css/styles.css`)

### 1.1 Activar secció `.productes` (Línia 559)
**Abans:**
```css
.productes {
  height: 100svh;
  width: 100%;
  background-color: var(--fons-clar);
  overflow: hidden;
  display:none;
}
```
**Després:**
```css
.productes {
  height: 100svh;
  width: 100%;
  background-color: var(--fons-clar);
  overflow: hidden;
}
```

### 1.2 Fix transition invàlida (Línia 1230)
**Abans:**
```css
transition: all 0.s ease;
```
**Després:**
```css
transition: all 0.3s ease;
```

### 1.3 Fix `.icon2` duplicat (Línies 1022-1028)
**Abans:**
```css
  .icon2 {
.icon2 {
  -webkit-mask-image: url("../img/icones%20svg/fruites%20del%20bosc.svg");
  mask-image: url("../img/icones%20svg/fruites%20del%20bosc.svg");
}

  }
```
**Després:**
```css
  .icon2 {
  -webkit-mask-image: url("../img/icones%20svg/fruites%20del%20bosc.svg");
  mask-image: url("../img/icones%20svg/fruites%20del%20bosc.svg");
}
```

### 1.4 Treure debug border del `.hero` (Línia 371)
**Abans:**
```css
  border: solid black 2px;
```
**Després:**
```css
  /* border removed - debug artifact */
```

### 1.5 Afegir estils de la secció "Especial"

Afegir al final del CSS (abans del media query d'items o després de `.productes`):

```css
/* ==========================================================================
                                   ESPECIAL
   ========================================================================== */
.especial {
  width: 100%;
  height: 100svh;
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5vh 0;
  gap: 10rem;
  position: relative;
}

.special-col1 {
  flex: 0 0 40%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  margin-left: 2rem;
}

.especial__title {
  font-size: clamp(3rem, calc(3.5vw + 1rem), 6rem);
  font-weight: 700;
  color: var(--fons-deg);
  text-align: left;
  transform-style: preserve-3d;
  line-height: 1;
  letter-spacing: -7%;
}

.especial__img {
  width: 300px;
  height: 300px;
  background-color: var(--fons-clar);
  -webkit-mask-image: url("../img/icones svg/icone principal.svg");
  mask-image: url("../img/icones svg/icone principal.svg");
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  align-self: center;
}

.special-col2 {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 2rem 5rem;
  gap: 2rem;
}

.special-col2 h2 {
  font-size: clamp(1.5rem, calc(3vw + 0.5rem), 3rem);
  font-weight: 700;
  color: var(--fons-violeta);
  line-height: 1;
  text-align: right;
}

.special-col2 p {
  font-size: clamp(0.8rem, calc(1vw + 0.5rem), 1.2rem);
  font-weight: 600;
  color: var(--fons-violeta);
  text-align: right;
}

.split-line {
  display: block;
  overflow: hidden;
  will-change: transform, opacity;
}

/* Special BG - overlay per clip-path reveal */
.special-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: var(--fons-clar);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5vh 0;
  gap: 10rem;
  clip-path: circle(0% at 50% 50%);
}

.special-bg .especial__title,
.special-bg .especial__text,
.special-bg .especial__p {
  color: var(--color-secondary);
}

.special-bg .especial__img {
  background-color: var(--color-secondary);
}

/* Responsive Especial */
@media (max-width: 1023px) {
  .especial {
    flex-direction: column;
    height: auto;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    overflow: hidden;
    padding: 1rem 5vw;
    padding-top: 5rem !important;
  }

  .special-col1 {
    width: 100%;
    align-items: center;
    text-align: center;
    gap: 4rem;
  }

  .especial__title {
    text-align: center;
    width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .special-col2 {
    width: 100%;
    align-items: center;
    justify-content: center;
    flex: none !important;
    padding: 0 !important;
    gap: 3rem;
  }

  .especial__text {
    text-align: center !important;
    width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .special-col2 h2 {
    font-size: clamp(2rem, calc(4.1vw + 1rem), 3rem);
    font-weight: 700;
    color: var(--fons-violeta);
    line-height: 1;
  }

  .special-col2 p {
    font-size: clamp(1rem, calc(1vw + 0.8rem), 1.2rem);
    font-weight: 600;
    color: var(--fons-violeta);
    text-align: left !important;
    overflow-wrap: break-word;
    word-break: break-word;
    margin-top: -1rem;
  }

  .especial__img {
    width: 250px;
    height: 250px;
    margin-right: 0rem !important;
  }

  .special-col2:nth-of-type(2) {
    padding-bottom: 50px !important;
  }
}

@media (max-width: 767px) {
  .especial__title {
    text-align: center;
    font-size: clamp(2.5rem, 10vw, 4rem);
  }

  .especial__img {
    width: 200px;
    height: 200px;
  }
}
```

---

## 2. CORRECCIONS HTML (`index.html`)

### 2.1 Fix nesting error del formulari (Línies 296-301)

**Abans:**
```html
              </div>

                <div class="form-field">
                  <input type="text" id="subject" name="subject" class="form-field__input" placeholder=" " required />
                  <label for="subject" class="form-field__label">Assumpte</label>
                </div>
              </div>
```

**Després:**
```html
              </div>

              <div class="form-row">
                <div class="form-field">
                  <input type="text" id="subject" name="subject" class="form-field__input" placeholder=" " required />
                  <label for="subject" class="form-field__label">Assumpte</label>
                </div>
              </div>
```

### 2.2 Afegir secció "Especial" entre Productes i Items

Inserir després de `</section>` de productes (línia 123) i abans de `<section class="items">` (línia 124):

```html
      <!-- ESPECIAL -->
      <section class="especial">
        <div class="special-col1">
          <h2 class="especial__title">Regala't un <br />moment de plaer</h2>
          <div class="especial__img"></div>
        </div>

        <div class="special-col2">
          <h2 class="especial__text">Perquè créixer no és renunciar al dolç</h2>
          <p class="especial__p">
            A Raymel recorrem Europa a la recerca dels millors gustos. No qualsevol gust, sinó aquell que et fa tancar els ulls,
            que et torna a aquell calaix de casa l'àvia, que et fa fer un "mmm" sense demanar permís. Som seleccionadors de plaers
            petits, d'aquells que no ocupen lloc pero que omplen molt. Perquè en un món que no para, aturar-se per una llaminadura
            és gairebé un acte revolucionari.
          </p>
          <p class="especial__p">
            Les nostres xuxes no són un snack, són una declaració d'intencions. La de qui sap que mereix quelcom bo, ara, sense
            esperar l'ocasió especial. Dolços per a paladars adults que, de tant en tant, necessiten reconnectar amb el nen que
            porten a dins. Perquè quan algú diu "és un plaer assaborir-te", ja saps com respondrem: el plaer és meu.
          </p>
        </div>
        <!-- Special Bg -->
        <div class="special-bg">
          <div class="special-col1">
            <h2 class="especial__title">Regala't un <br />moment de plaer</h2>
            <div class="especial__img"></div>
          </div>

          <div class="special-col2">
            <h2 class="especial__text">Perquè créixer no és renunciar al dolç</h2>
            <p class="especial__p">
              A Raymel recorrem Europa a la recerca dels millors gustos. No qualsevol gust, sinó aquell que et fa tancar els ulls,
              que et torna a aquell calaix de casa l'àvia, que et fa fer un "mmm" sense demanar permís. Som seleccionadors de
              plaers petits, d'aquells que no ocupen lloc pero que omplen molt. Perquè en un món que no para, aturar-se per una
              llaminadura és gairebé un acte revolucionari.
            </p>
            <p class="especial__p">
              Les nostres xuxes no són un snack, són una declaració d'intencions. La de qui sap que mereix quelcom bo, ara, sense
              esperar l'ocasió especial. Dolços per a paladars adults que, de tant en tant, necessiten reconnectar amb el nen que
              porten a dins. Perquè quan algú diu "és un plaer assaborir-te", ja saps com respondrem: el plaer és meu.
            </p>
          </div>
        </div>
      </section>
```

---

## 3. CORRECCIONS JS (`js/scripts.js`)

### 3.1 Canviar threshold mobil (Línia 5)

**Abans:**
```javascript
let mobil = window.innerWidth < 400;
```
**Després:**
```javascript
let mobil = window.innerWidth < 1366;
```

### 3.2 Treure markers:true del parlem ScrollTrigger (Línia 449)

**Abans:**
```javascript
          markers:true
```
**Després:**
```javascript
          markers:false
```

### 3.3 Descomentar sortida de Pols (Línies 397-405)

**Abans:**
```javascript
      /* Sortida Pols ->
      .to(pols.chars,{ yPercent: -100, stagger: 0.02, duration: 0.3, autoAlpha:0})
      .to(polsText.lines, { stagger: 0.15, autoAlpha: 0, ease: "power2.out",  rotationY: 110, x: 100,}, "<")
      .to(".Pols .textFrase", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Pols .comprar", { autoAlpha: 0, y: -50, ease: "power2.in" },"<")
      .to(".Pols .boxImgItems", { autoAlpha: 0, scale: 0, ease: "power2.in", },"<" )
      .to(".Pols .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2},"<")
      .to(".Pols", { autoAlpha: 0 }, ">")
      */
```
**Després:**
```javascript
      // Sortida Pols ->
      .to(pols.chars,{ yPercent: -100, stagger: 0.02, duration: 0.3, autoAlpha:0})
      .to(polsText.lines, { stagger: 0.15, autoAlpha: 0, ease: "power2.out",  rotationY: 110, x: 100,}, "<")
      .to(".Pols .textFrase", { autoAlpha: 0, y: -50, ease: "power2.in" }, "<")
      .to(".Pols .comprar", { autoAlpha: 0, y: -50, ease: "power2.in" },"<")
      .to(".Pols .boxImgItems", { autoAlpha: 0, scale: 0, ease: "power2.in", },"<" )
      .to(".Pols .boxImgItems img", { rotationY: 360, autoAlpha: 0, scale: 0.2},"<")
      .to(".Pols", { autoAlpha: 0 }, ">")
```

### 3.4 Descomentar enviamient real del formulari (Línies 523-560)

**Abans:**
```javascript
    try {

         /*
      if (typeof grecaptcha !== 'undefined') {
        const token = await grecaptcha.execute('TU_SITE_KEY', {action: 'submit'});
        formData.append('recaptcha_response', token);
      }
      */
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast('Missatge enviat correctament!', 'success');
      contactForm.reset();
    } catch (error) {
      showToast('Error al enviar el missatge. Torna-ho a provar.', 'error');
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
```

**Després:**
```javascript
    try {
      if (typeof grecaptcha !== 'undefined') {
        const token = await grecaptcha.execute('TU_SITE_KEY', {action: 'submit'});
        formData.append('recaptcha_response', token);
      }

      const response = await fetch('php/contacte.php', {
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
```

> **Nota:** El path del fetch s'ha canviat de `contacte.php` a `php/contacte.php` perquè el fitxer PHP està dins la carpeta `php/`.

### 3.5 Afegir animacions GSAP de la secció "Especial"

Inserir després de l'animació de `.productes` (després de línia 141) i abans de la secció ITEM (abans de línia 151):

```javascript
  // ============================  ESPECIAL  ======================================

  const splitEspecial = new SplitText(".especial__title, .especial__text, .especial__p", {
    type: "lines",
    linesClass: "split-line",
  });
  gsap.set(".special-col1, .special-col2", { perspective: 400 });

  let specialTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".especial",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  specialTL
    .from(splitEspecial.lines, {
      duration: 1.2,
      rotationX: -80,
      opacity: 0,
      force3D: true,
      transformOrigin: "top center -50",
      stagger: 0.1,
      ease: "power3.out",
      onComplete: () => {
        gsap.set(splitEspecial.lines, { clearProps: "transform" });
      },
    })
    .from(
      ".especial__img",
      {
        scale: 0,
        opacity: 0,
        duration: 1.38,
        ease: "back.out(1.7)",
      },
      "-=2.5",
    )
    .to(".special-bg", {
      clipPath: "circle(150% at 50% 50%)",
      ease: "none",
      scrollTrigger: {
        trigger: ".especial",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      },
      delay: 2,
    });
```

---

## 4. Ordre d'Execució Recomanat

1. **CSS fixes** (4 edicions independents)
2. **HTML fixes** (form nesting + insertar Especial section)
3. **JS fixes** (threshold, markers, Pols exit, form fetch)
4. **JS add** (animacions Especial)
5. **CSS add** (estils Especial complets)

---

## 5. Verificació Post-Canvis

Un cop aplicats tots els canvis, verificar:
- [ ] La secció `.productes` és visible amb scroll horitzontal
- [ ] El formulari té estructura HTML correcta
- [ ] No hi ha cap border negre debug al hero
- [ ] No apareixen markers GSAP vermells/verds
- [ ] La secció Especial mostra animació 3D flip-in del text
- [ ] La icona de l'Especial apareix amb efecte bounce (back.out)
- [ ] El fons de l'Especial fa reveal circular (clip-path) al fer scroll
- [ ] El formulari envia realment a `php/contacte.php`
- [ ] L'últim item (Pols) desapareix correctament al fer scroll
- [ ] Responsive: especial es veu bé a mòbil (< 1024px)
