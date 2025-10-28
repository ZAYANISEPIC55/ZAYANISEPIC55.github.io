document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // Dark/Light buttons
  const lightBtn = document.getElementById('light-btn');
  const darkBtn = document.getElementById('dark-btn');

  lightBtn.addEventListener('click', () => {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  });

  darkBtn.addEventListener('click', () => {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') html.classList.add('dark');

  // Language system
  const languageBtn = document.getElementById('language-btn');
  const languageMenu = document.getElementById('language-menu');
  const dropdown = document.querySelector('.language-dropdown');

  const translations = {
    en: {
      title: "Welcome to KLM Virtual",
      subtitle: "Created by Zayan Hussain (ZAYANISEPIC55)",
      text: "This is the first page of your website — hosted free on GitHub Pages!"
    },
    nl: {
      title: "Welkom bij KLM Virtual",
      subtitle: "Gemaakt door Zayan Hussain (ZAYANISEPIC55)",
      text: "Dit is de eerste pagina van je website — gratis gehost op GitHub Pages!"
    },
    fr: {
      title: "Bienvenue chez KLM Virtual",
      subtitle: "Créé par Zayan Hussain (ZAYANISEPIC55)",
      text: "Ceci est la première page de votre site — hébergé gratuitement sur GitHub Pages !"
    },
    es: {
      title: "Bienvenido a KLM Virtual",
      subtitle: "Creado por Zayan Hussain (ZAYANISEPIC55)",
      text: "Esta es la primera página de tu sitio web — ¡alojado gratis en GitHub Pages!"
    },
    de: {
      title: "Willkommen bei KLM Virtual",
      subtitle: "Erstellt von Zayan Hussain (ZAYANISEPIC55)",
      text: "Dies ist die erste Seite Ihrer Website — kostenlos gehostet auf GitHub Pages!"
    },
    it: {
      title: "Benvenuto in KLM Virtual",
      subtitle: "Creato da Zayan Hussain (ZAYANISEPIC55)",
      text: "Questa è la prima pagina del tuo sito web — ospitata gratuitamente su GitHub Pages!"
    },
    ar: {
      title: "مرحبًا بك في KLM Virtual",
      subtitle: "تم الإنشاء بواسطة Zayan Hussain (ZAYANISEPIC55)",
      text: "هذه هي الصفحة الأولى لموقعك — مستضافة مجانًا على GitHub Pages!"
    }
  };

  const mainTitle = document.getElementById('main-title');
  const mainSubtitle = document.getElementById('main-subtitle');
  const mainText = document.getElementById('main-text');

  function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    mainTitle.textContent = translations[lang].title;
    mainSubtitle.textContent = translations[lang].subtitle;
    mainText.textContent = translations[lang].text;
    const flag = languageMenu.querySelector(`div[data-lang="${lang}"]`).textContent;
    languageBtn.textContent = flag + " ▼";
    localStorage.setItem('language', lang);
  }

  // Auto-detect browser language
  const browserLang = navigator.language.slice(0,2);
  setLanguage(localStorage.getItem('language') || browserLang);

  // Open/close dropdown
  languageBtn.addEventListener('click', () => {
    dropdown.classList.toggle('show');
  });

  // Make dropdown scrollable if too many languages
  languageMenu.style.maxHeight = "200px";
  languageMenu.style.overflowY = "auto";

  // Select language
  languageMenu.querySelectorAll('div').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      setLanguage(item.getAttribute('data-lang'));
      dropdown.classList.remove('show'); // Close immediately after selection
    });
  });

  // Close dropdown if clicked outside
  window.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
});
