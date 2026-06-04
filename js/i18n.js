/* ----- SISTEMA D'INTERNACIONALITZACIÓ (i18n) ----- */
const I18N = {
  cat: {
    // Navegació
    'nav-nosaltres': 'Nosaltres',
    'nav-productes': 'Productes',
    'nav-especialitats': 'Especialitats',
    'nav-contacte': 'Contacte',
    'nav-botiga': 'Botiga',
    // Hero
    'hero-scroll': 'Scroll per explorar',
    // Especial / Nosaltres
    'especial-title': 'Regala\'t un<br>moment de plaer',
    'especial-subtitle': 'Perquè créixer no és renunciar al dolç',
    'especial-p1': 'A Raymel recorrem Europa a la recerca dels millors gustos. No qualsevol gust, sinó aquell que et fa tancar els ulls, que et torna a aquell calaix de casa l\'àvia, que et fa fer un "mmm" sense demanar permís. Som seleccionadors de plaers petits, d\'aquells que no ocupen lloc però que omplen molt. Perquè en un món que no para, aturar-se per una llaminadura és gairebé un acte revolucionari.<br><br>Les nostres xuxes no són un snack, són una declaració d\'intencions. La de qui sap que mereix quelcom bo, ara, sense esperar l\'ocasió especial.',
    'especial-p2': '',
    // Contact info
    'contact-subtitle': 'Dolços premium d\'arreu d\'Europa per a paladars exigents.',
    'contact-desc': 'Som seleccionadors de plaers petits, d\'aquells que no ocupen lloc però que omplen molt. Les nostres llaminadures són una declaració d\'intencions.',
    // Contact form
    'form-title': 'Envia\'ns un missatge',
    'form-subtitle': 'Farem realitat la teva idea més dolça.',
    'form-label-email': 'Email',
    'form-label-tel': 'Tel',
    'form-label-address': 'Adreça',
    'form-social': 'Segueix-nos',
    'form-name': 'Nom',
    'form-email': 'Email',
    'form-message': 'Missatge',
    'form-name-placeholder': 'El teu nom',
    'form-email-placeholder': 'El teu email',
    'form-message-placeholder': 'Escriu el teu missatge...',
    'form-privacy': 'Accepto les',
    'form-privacy-link': 'condicions',
    'form-submit': 'Enviar',
    // Footer
    'footer-links': 'Enllaços',
    'footer-privacy': 'Política de privacitat',
    'footer-legal': 'Avís legal',
    'footer-cookies': 'Política de cookies',
    'footer-cookies-title': 'Política de cookies',
    'footer-more-info': 'Més informació',
    'footer-credit': 'Creada per',
    'footer-rights': '© 2026 Raymel Sweet Sensations. Tots els drets reservats.',
    // Testimonis
    'testimonial-quote-1': '"Les millors llaminadures que he provat mai! Un plaer absolut en cada mossegada, repetiré segur."',
    'testimonial-date-1': 'Maig 2024',
    'testimonial-quote-2': '"Raymel sempre sorprèn amb els seus gustos únics. Els guixos de regalèssia són d\'un altre món."',
    'testimonial-date-2': 'Abril 2024',
    'testimonial-quote-3': '"Un moment de dolçor necessari en un dia atrafegat. Qualitat premium i presentació impecable."',
    'testimonial-date-3': 'Març 2024',
    // Cookie banner
    'cookie-text': 'Utilitzem cookies pròpies i de tercers per millorar la teva experiència. Si continues navegant, acceptes l\'ús de cookies.',
    'cookie-more': 'Més informació',
    'cookie-accept': 'Acceptar totes',
    'cookie-reject': 'Rebutjar',
    'form-address-val': 'Carretera C-63, Nau 12-14<br>17410 Sils',
    // Productes — títols, descripcions, frases
    'prod-guixos-title': 'Guixos de regalèssia',
    'prod-guixos-desc': 'Hi ha gustos que no s\'expliquen, només es recorden. El guix de regalèssia és un d\'aquells. Intens, negre, real. Per als que saben el que volen.',
    'prod-guixos-frase': 'Perquè alguns plaers no necessiten justificació.',
    'prod-ossets-title': 'Ossets àcids',
    'prod-ossets-desc': 'Primer et fa fer cara. Després et fa repetir. Els ossets àcids tenen aquell do de convertir un moment qualsevol en una petita aventura per al paladar.',
    'prod-ossets-frase': 'Deixa\'t sorprendre, de nou.',
    'prod-perles-title': 'Perles de menta',
    'prod-perles-desc': 'Fresques, rodones i perfectes. Les perles de menta no criden l\'atenció, però quan les proves entens per què mai no en queda cap.',
    'prod-perles-frase': 'El petit detall que ho canvia tot.',
    'prod-fruites-title': 'Fruites del bosc',
    'prod-fruites-desc': 'Mores, gerds, nabius... tot allò que el bosc amaga i tu trobes aquí. Un gust llarg, profund i honest. Sense artificis, només la fruita.',
    'prod-fruites-frase': 'La naturalesa en forma de capritx.',
    'prod-fulles-title': 'Fulla de regalèssia',
    'prod-fulles-desc': 'La fulla de regalèssia és un clàssic que resisteix tendències. Suau per fora, intensa per dins. Reconeixeràs el gust fins i tot amb els ulls tancats.',
    'prod-fulles-frase': 'Alguns gustos no passen de moda. Per alguna raó serà.',
    'prod-coles-title': 'Ampolles de refrescs àcids',
    'prod-coles-desc': 'Les coles sempre han existit. Però no totes les coles són iguals. Les nostres tenen aquella textura que et fa trigar el doble a acabar-les. I ho agraeixes.',
    'prod-coles-frase': 'Senzilles. Insubstituïbles.',
    'prod-maduixes-title': 'Maduixes àcides',
    'prod-maduixes-desc': 'No hi ha res com mossegar una maduixa de veritat. Les nostres no se n\'allunyen gaire. Dolces, lleugerament àcides, i irresistiblement vermelles.',
    'prod-maduixes-frase': 'Una cada dia no és excés. És costum.',
    'prod-pols-title': 'Guix amb pols de regalèssia',
    'prod-pols-desc': 'El guix de tota la vida, però amb un secret a dins. La pols de regalèssia apareix just al final, quan ja creus que saps com acaba la història. I ens encanta despistar-te.',
    'prod-pols-frase': 'El gust que no t\'esperes. El que tornes a buscar.',
    // Productes page
    'btn-comprar': 'Botiga',
    'btn-botiga': 'Botiga',
    // Selector d'idiomes
    'lang-cat': 'CAT',
    'lang-es': 'ES',
    'lang-en': 'EN',
  },

  es: {
    'nav-nosaltres': 'Nosotros',
    'nav-productes': 'Productos',
    'nav-especialitats': 'Especialidades',
    'nav-contacte': 'Contacto',
    'nav-botiga': 'Tienda',
    'hero-scroll': 'Desplázate para explorar',
    'especial-title': 'Regálate un<br>momento de placer',
    'especial-subtitle': 'Porque crecer no es renunciar al dulce',
    'especial-p1': 'En Raymel recorremos Europa en busca de los mejores sabores. No cualquier sabor, sino aquel que te hace cerrar los ojos, que te devuelve a ese cajón de casa de la abuela, que te hace hacer un "mmm" sin pedir permiso. Somos seleccionadores de placeres pequeños, de esos que no ocupan lugar pero que llenan mucho. Porque en un mundo que no para, detenerse por una golosina es casi un acto revolucionario.<br><br>Nuestras chuches no son un snack, son una declaración de intenciones. La de quien sabe que merece algo bueno, ahora, sin esperar la ocasión especial.',
    'especial-p2': '',
    'contact-subtitle': 'Dulces premium de toda Europa para paladares exigentes.',
    'contact-desc': 'Somos seleccionadores de placeres pequeños, de esos que no ocupan lugar pero que llenan mucho. Nuestras golosinas son una declaración de intenciones.',
    'form-title': 'Envíanos un mensaje',
    'form-subtitle': 'Haremos realidad tu idea más dulce.',
    'form-label-email': 'Email',
    'form-label-tel': 'Tel',
    'form-label-address': 'Dirección',
    'form-social': 'Síguenos',
    'form-name': 'Nombre',
    'form-email': 'Email',
    'form-message': 'Mensaje',
    'form-name-placeholder': 'Tu nombre',
    'form-email-placeholder': 'Tu email',
    'form-message-placeholder': 'Escribe tu mensaje...',
    'form-privacy': 'Acepto las',
    'form-privacy-link': 'condiciones',
    'form-submit': 'Enviar',
    'footer-links': 'Enlaces',
    'footer-privacy': 'Política de privacidad',
    'footer-legal': 'Aviso legal',
    'footer-cookies': 'Política de cookies',
    'footer-cookies-title': 'Política de cookies',
    'footer-more-info': 'Más información',
    'footer-credit': 'Creada por',
    'footer-rights': '© 2026 Raymel Sweet Sensations. Todos los derechos reservados.',
    // Testimonios
    'testimonial-quote-1': '"¡Las mejores golosinas que he probado nunca! Un placer absoluto en cada bocado, repetiré seguro."',
    'testimonial-date-1': 'Mayo 2024',
    'testimonial-quote-2': '"Raymel siempre sorprende con sus sabores únicos. El regaliz en rama es de otro mundo."',
    'testimonial-date-2': 'Abril 2024',
    'testimonial-quote-3': '"Un momento de dulzura necesario en un día ajetreado. Calidad premium y presentación impecable."',
    'testimonial-date-3': 'Marzo 2024',
    'cookie-text': 'Utilizamos cookies propias y de terceros para mejorar tu experiencia. Si continúas navegando, aceptas el uso de cookies.',
    'cookie-more': 'Más información',
    'cookie-accept': 'Aceptar todas',
    'cookie-reject': 'Rechazar',
    'form-address-val': 'Carretera C-63, Nau 12-14<br>17410 Sils',
    'prod-guixos-title': 'Regaliz en rama',
    'prod-guixos-desc': 'Hay sabores que no se explican, solo se recuerdan. El regaliz en rama es uno de esos. Intenso, negro, real. Para los que saben lo que quieren.',
    'prod-guixos-frase': 'Porque algunos placeres no necesitan justificación.',
    'prod-ossets-title': 'Ositos ácidos',
    'prod-ossets-desc': 'Primero te hace poner cara. Luego te hace repetir. Los ositos ácidos tienen ese don de convertir cualquier momento en una pequeña aventura para el paladar.',
    'prod-ossets-frase': 'Déjate sorprender, de nuevo.',
    'prod-perles-title': 'Perlas de menta',
    'prod-perles-desc': 'Frescas, redondas y perfectas. Las perlas de menta no llaman la atención, pero cuando las pruebas entiendes por qué nunca sobra ninguna.',
    'prod-perles-frase': 'El pequeño detalle que lo cambia todo.',
    'prod-fruites-title': 'Frutas del bosque',
    'prod-fruites-desc': 'Moras, frambuesas, arándanos... todo lo que el bosque esconde y tú encuentras aquí. Un sabor largo, profundo y honesto. Sin artificios, solo la fruta.',
    'prod-fruites-frase': 'La naturaleza en forma de capricho.',
    'prod-fulles-title': 'Hoja de regaliz',
    'prod-fulles-desc': 'La hoja de regaliz es un clásico que resiste tendencias. Suave por fuera, intensa por dentro. Reconocerás el sabor incluso con los ojos cerrados.',
    'prod-fulles-frase': 'Algunos sabores no pasan de moda. Por algo será.',
    'prod-coles-title': 'Botellas de refresco ácido',
    'prod-coles-desc': 'Las colas siempre han existido. Pero no todas las colas son iguales. Las nuestras tienen esa textura que te hace tardar el doble en acabarlas. Y lo agradeces.',
    'prod-coles-frase': 'Sencillas. Insustituibles.',
    'prod-maduixes-title': 'Fresas ácidas',
    'prod-maduixes-desc': 'No hay nada como morder una fresa de verdad. Las nuestras no se alejan mucho. Dulces, ligeramente ácidas, e irresistiblemente rojas.',
    'prod-maduixes-frase': 'Una al día no es exceso. Es costumbre.',
    'prod-pols-title': 'Regaliz en rama con polvo',
    'prod-pols-desc': 'El regaliz de toda la vida, pero con un secreto dentro. El polvo de regaliz aparece justo al final, cuando ya crees que sabes cómo termina la historia. Y nos encanta despistarte.',
    'prod-pols-frase': 'El sabor que no te esperas. Al que vuelves.',
    'btn-comprar': 'Tienda',
    'btn-botiga': 'Tienda',
    'lang-cat': 'CAT',
    'lang-es': 'ES',
    'lang-en': 'EN',
  },

  en: {
    'nav-nosaltres': 'About Us',
    'nav-productes': 'Products',
    'nav-especialitats': 'Specialties',
    'nav-contacte': 'Contact',
    'nav-botiga': 'Shop',
    'hero-scroll': 'Scroll to explore',
    'especial-title': 'Treat yourself to a<br>moment of pleasure',
    'especial-subtitle': 'Because growing up doesn\'t mean giving up sweetness',
    'especial-p1': 'At Raymel we travel across Europe searching for the best flavors. Not just any flavor, but the one that makes you close your eyes, that takes you back to grandma\'s drawer, that makes you go "mmm" without asking permission. We are selectors of small pleasures, the kind that don\'t take up space but fill you up. Because in a world that never stops, stopping for a candy is almost a revolutionary act.<br><br>Our sweets aren\'t a snack, they\'re a statement. From someone who knows they deserve something good, right now, without waiting for a special occasion.',
    'especial-p2': '',
    'contact-subtitle': 'Premium sweets from across Europe for demanding palates.',
    'contact-desc': 'We are selectors of small pleasures, the kind that don\'t take up space but fill you up. Our candies are a statement of intent.',
    'form-title': 'Send us a message',
    'form-subtitle': 'We\'ll make your sweetest idea come true.',
    'form-label-email': 'Email',
    'form-label-tel': 'Phone',
    'form-label-address': 'Address',
    'form-social': 'Follow us',
    'form-name': 'Name',
    'form-email': 'Email',
    'form-message': 'Message',
    'form-name-placeholder': 'Your name',
    'form-email-placeholder': 'Your email',
    'form-message-placeholder': 'Write your message...',
    'form-privacy': 'I accept the',
    'form-privacy-link': 'terms',
    'form-submit': 'Send',
    'footer-links': 'Links',
    'footer-privacy': 'Privacy Policy',
    'footer-legal': 'Legal Notice',
    'footer-cookies': 'Cookie Policy',
    'footer-cookies-title': 'Cookie Policy',
    'footer-more-info': 'More Info',
    'footer-credit': 'Created by',
    'footer-rights': '© 2026 Raymel Sweet Sensations. All rights reserved.',
    // Testimonials
    'testimonial-quote-1': '"The best candies I have ever tasted! An absolute pleasure in every bite, I will definitely repeat."',
    'testimonial-date-1': 'May 2024',
    'testimonial-quote-2': '"Raymel always surprises with its unique flavors. The licorice sticks are out of this world."',
    'testimonial-date-2': 'April 2024',
    'testimonial-quote-3': '"A necessary sweet moment in a busy day. Premium quality and impeccable presentation."',
    'testimonial-date-3': 'March 2024',
    'cookie-text': 'We use our own and third-party cookies to improve your experience. By continuing to browse, you accept the use of cookies.',
    'cookie-more': 'More Info',
    'cookie-accept': 'Accept All',
    'cookie-reject': 'Reject',
    'form-address-val': 'Carretera C-63, Nau 12-14<br>17410 Sils',
    'prod-guixos-title': 'Licorice sticks',
    'prod-guixos-desc': 'Some flavors can\'t be explained, only remembered. Licorice sticks are one of those. Intense, black, real. For those who know what they want.',
    'prod-guixos-frase': 'Because some pleasures need no justification.',
    'prod-ossets-title': 'Sour gummy bears',
    'prod-ossets-desc': 'First they make you pull a face. Then they make you reach for more. Sour gummy bears have that gift of turning any moment into a little adventure for your palate.',
    'prod-ossets-frase': 'Let yourself be surprised, all over again.',
    'prod-perles-title': 'Mint pearls',
    'prod-perles-desc': 'Cool, round, and perfect. Mint pearls don\'t demand attention, but once you try them you understand why there\'s never one left.',
    'prod-perles-frase': 'The little detail that changes everything.',
    'prod-fruites-title': 'Forest berries',
    'prod-fruites-desc': 'Blackberries, raspberries, blueberries... everything the forest hides and you find here. A long, deep, honest flavor. No artifice, just the fruit.',
    'prod-fruites-frase': 'Nature in the form of a craving.',
    'prod-fulles-title': 'Licorice leaf',
    'prod-fulles-desc': 'The licorice leaf is a classic that withstands trends. Soft on the outside, intense within. You\'ll recognize the taste even with your eyes closed.',
    'prod-fulles-frase': 'Some flavors never go out of style. There\'s a reason for that.',
    'prod-coles-title': 'Soda bottles',
    'prod-coles-desc': 'Cola bottles have always been around. But not all cola bottles are the same. Ours have that texture that makes you take twice as long to finish them. And you\'re glad for it.',
    'prod-coles-frase': 'Simple. Irreplaceable.',
    'prod-maduixes-title': 'Sour strawberries',
    'prod-maduixes-desc': 'There\'s nothing like biting into a real strawberry. Ours aren\'t far off. Sweet, slightly sour, and irresistibly red.',
    'prod-maduixes-frase': 'One a day isn\'t excess. It\'s a habit.',
    'prod-pols-title': 'Licorice stick with powder',
    'prod-pols-desc': 'The classic licorice stick, but with a secret inside. The licorice powder appears right at the end, just when you think you know how the story ends. And we love to keep you guessing.',
    'prod-pols-frase': 'The flavor you don\'t expect. The one you come back for.',
    'btn-comprar': 'Shop',
    'btn-botiga': 'Shop',
    'lang-cat': 'CAT',
    'lang-es': 'ES',
    'lang-en': 'EN',
  },
};

/* ----- GESTOR D'IDIOMES ----- */
const LangManager = {
  currentLang: 'cat',
  storageKey: 'raymel-lang',

  init() {
    // Recuperar idioma guardat
    const saved = localStorage.getItem(this.storageKey);
    if (saved && I18N[saved]) {
      this.currentLang = saved;
    }

    // Aplicar traduccions inicials (abans que SplitText les processi)
    this.apply();

    // Marcar idioma actiu als selectors
    this.updateActiveLang();

    // Configurar els selectors d'idioma
    this.bindSelectors();

    // Tancar dropdown en fer clic fora
    document.addEventListener('click', (e) => {
      document.querySelectorAll('.lang-switcher.is-open').forEach((el) => {
        if (!el.contains(e.target)) {
          el.classList.remove('is-open');
        }
      });
    });
  },

  setLang(lang) {
    if (!I18N[lang]) return;
    if (lang === this.currentLang) return;
    this.currentLang = lang;
    localStorage.setItem(this.storageKey, lang);
    // Recarregar perquè SplitText ja ha processat el text i no es pot substituir en viu
    window.location.reload();
  },

  apply() {
    const lang = this.currentLang;
    const translations = I18N[lang];
    if (!translations) return;

    // Traduir elements amb data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[key] !== undefined) {
        // Per títols de secció que poden contenir HTML (com <br>)
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = translations[key];
        } else {
          el.textContent = translations[key];
        }
      }
    });

    // Traduir placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[key] !== undefined) {
        el.placeholder = translations[key];
      }
    });

    // Traduir lang labels als selectors (botons amb SVG o links plans)
    document.querySelectorAll('[data-i18n-lang]').forEach((el) => {
      const langCode = el.getAttribute('data-i18n-lang');
      if (I18N[lang] && I18N[lang][langCode] !== undefined) {
        const label = I18N[lang][langCode];
        // Si té un SVG dins, només canviem el primer node de text
        if (el.querySelector('svg')) {
          const textNodes = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
          if (textNodes.length > 0) {
            textNodes[0].textContent = ` ${label} `;
          }
        } else {
          el.textContent = label;
        }
      }
    });
  },

  updateActiveLang() {
    // Actualitzar classe active als selectors
    document.querySelectorAll('.lang-switcher__option').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.lang === this.currentLang);
    });
    document.querySelectorAll('.lang-switcher__mobile-link').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.lang === this.currentLang);
    });

    // Actualitzar el text del botó principal al idioma actual
    const btn = document.querySelector('.lang-switcher__btn');
    if (btn) {
      const langKey = `lang-${this.currentLang}`;
      const label = (I18N[this.currentLang] && I18N[this.currentLang][langKey]) || this.currentLang.toUpperCase();
      const textNodes = Array.from(btn.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
      if (textNodes.length > 0) {
        textNodes[0].textContent = ` ${label} `;
      }
    }
  },

  bindSelectors() {
    // Dropdown desktop: opcions
    document.querySelectorAll('.lang-switcher__option').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = el.dataset.lang;
        if (lang) {
          this.setLang(lang);
          // Tancar dropdown
          el.closest('.lang-switcher')?.classList.remove('is-open');
        }
      });
    });

    // Menú mòbil: links
    document.querySelectorAll('.lang-switcher__mobile-link').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = el.dataset.lang;
        if (lang) {
          this.setLang(lang);
        }
      });
    });
  },
};

// Inicialitzar en carregar el DOM
document.addEventListener('DOMContentLoaded', () => {
  LangManager.init();
});
