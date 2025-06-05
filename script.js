document.addEventListener('DOMContentLoaded', () => {
  // ========== Конфигурация и константы ==========
  const CONFIG = {
    defaultTheme: 'dark',
    defaultLanguage: 'en',
    translationSpeed: 300,
    parallaxIntensity: 0.2,
    blobIntensity: 0.4
  };

  // ========== Модуль управления темой ==========
  const ThemeManager = (() => {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icons = themeToggle?.querySelectorAll('.theme-icon');

    const THEME_LOGO_PATHS = {
      light: "assets/logo-dark.svg", // для светлой темы — тёмный логотип
      dark: "assets/logo-light.svg"  // для тёмной темы — светлый логотип
    };

    // Обновление логотипа
    function updateLogo(theme) {
      const logos = document.querySelectorAll('.theme-logo');
      const src = theme === 'light' ? THEME_LOGO_PATHS.light : THEME_LOGO_PATHS.dark;
      logos.forEach(logo => {
        logo.src = src;
      });
    }


    // Обновление иконок переключателя
    function updateIcons(isLight) {
      if (!icons) return;
      icons[0].style.opacity = isLight ? 0 : 1; // moon.svg
      icons[1].style.opacity = isLight ? 1 : 0; // sun.svg
    }

    // Применить тему
    function applyTheme(theme) {
      body.classList.toggle('light', theme === 'light');
      updateIcons(theme === 'light');
      updateLogo(theme);
      localStorage.setItem('theme', theme);
    }

    // Переключение темы при клике
    function toggleTheme() {
      const isLight = body.classList.toggle('light');
      const theme = isLight ? 'light' : 'dark';
      applyTheme(theme);
    }

    // Инициализация
    function init() {
      if (!themeToggle) return;

      const savedTheme = localStorage.getItem('theme') || CONFIG.defaultTheme;
      applyTheme(savedTheme);

      themeToggle.addEventListener('click', toggleTheme);
    }

    return { init };
  })();

  // ========== Модуль локализации ==========
  const LocalizationManager = (() => {
    const langSelect = document.querySelector('.lang-select');
    const flagContainer = document.querySelector('.selected-lang-flag');

    const translations = {
      en: {
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'hero.title': 'We create <span class="highlight">a digital</span> atmosphere',
        'hero.subtitle': 'We help businesses develop in the online space.',
        'hero.text': 'We prepare powerful digital strategies, develop selling websites, launch effective advertising and promote brands on social networks.',
        'payment.text': 'We accept <span class="highlight">50+</span> payment methods',
        'hero.cta': 'Get in Touch',
        'contact.title': 'Contact Us',
        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.message': 'Message',
        'contact.send': 'Send',
        'services.branding.title': 'Branding & Design',
        'services.branding.item1': 'Logo and corporate identity development',
        'services.branding.item2': 'Presentations and promotional materials',
        'services.layout.title': 'Frontend Development',
        'services.layout.item1': 'Landings, corporate websites, online stores',
        'services.layout.item2': 'User-friendly interface, responsive design, SEO optimization',
        'services.ads.title': 'Advertising',
        'services.ads.item1': 'Google Ads, FB/INST/TG setup',
        'services.ads.item2': 'Audience analysis and conversion optimization',
        'services.seo.title': 'SEO Promotion',
        'services.seo.item1': 'Comprehensive search engine promotion',
        'services.seo.item2': 'Organic traffic growth',
        'services.seo.item3': 'Content and meta tags optimization',
        'services.content.title': 'Content Marketing',
        'services.content.item1': 'Social media management, content creation, audience engagement',
        'services.content.item2': 'Promotion strategy development',
        'services.development.title': 'Development',
        'services.development.item1': 'Web and mobile applications development',
        'services.development.item2': 'Chatbots and TMA development',
        'services.development.item3': 'Database integration and back-end development',
        'features.title': 'Give your business a second wind',
        'features.item1.title': 'We Know Our Craft',
        'features.item1.text': 'Professionalism honed over years: we make complex things simple.',
        'features.item2.title': 'We Create With Soul',
        'features.item2.text': 'Creativity that works: projects that stand out from competitors.',
        'features.item3.title': 'We Deliver On Time',
        'features.item3.text': 'Clear deadlines - we meet them without hiccups.',
        'features.footer': '<span class="highlight">A whole <span class="green">galaxy of technologies</span></span> in our arsenal',
        'tech.languages': 'Programming Languages',
        'tech.web_basics': 'Web Basics',
        'tech.frontend': 'Frontend Ecosystem',
        'tech.tools': 'Tools',
        'tech.cloud': 'Cloud & Infrastructure',
        'tech.backend': 'Backend Stack',
        'tech.cms': 'CMS & E-commerce',
        'tech.api': 'API',
        'tech.databases': 'Databases',
        'tech.design': 'Design Tools',
        'tech.web3': 'Web3 Tools',
        'banner.title': 'From <span>MVP</span> to ecosystem',
        'banner.subtitle': 'Tailored to your budget, needs and scale.',
        'banner.description': 'From advanced landing pages to multifunctional platforms: we develop to maximize your results.',
        'banner.button': 'Contact us',
        'advantage.title': 'Everything to make <span class="green">your project</span> not just exist, but generate profit.',
        'advantage.responsiveness_title': "Responsiveness",
        'advantage.responsiveness_text': "Flawless display on all devices — your site always looks professional",
        'advantage.colors_title': "Color Solutions",
        'advantage.colors_text': "Ergonomic palettes that engage rather than irritate",
        'advantage.multilingual_title': "Multilingual",
        'advantage.multilingual_text': "Breaking language barriers — we communicate with clients in their native language",
        'advantage.speed_title': "Speed",
        'advantage.speed_text': "Lightning-fast loading: we keep users without annoying waits",
        'advantage.optimization_title': "Optimization",
        'advantage.optimization_text': "Built-in SEO framework: the platform is ready to promote your business in search",
        'advantage.security_title': "Security",
        'advantage.security_text': "Bank-level protection: HTTPS, DDoS filtering and regular backups",
        "info.title": "Anything else?",
        "info.text": "We'll discuss the rest in private correspondence.",
        "info.button": "Discuss project",
        "info.work_hours.title": "Working hours",
        "info.work_hours.text": "24/7",
        "info.night_response.title": "Night response",
        "info.night_response.text": "Within 3 hours",
        'feedback.title': "Let's connect<br> to discuss<br> details",
        'feedback.also': "Also:",
        'feedback.benefit1': "We'll tell you about opportunities",
        'feedback.benefit2': "We'll analyze your current website",
        'feedback.benefit3': "We'll define project goals",
        'feedback.benefit4': "We'll discuss development timeline",
        'feedback.benefit5': "We'll send 3 proposal options",
        'feedback.contact_preference': "How would you like to be contacted?",
        'feedback.call': "Call",
        'feedback.telegram': "Telegram",
        'feedback.whatsapp': "WhatsApp",
        'feedback.name': "Your name",
        'feedback.phone': "Phone number",
        'feedback.submit_btn': "Contact me",
        'feedback.agreement': "By clicking 'Contact me' you agree to our Privacy Policy"
        // ... остальные переводы для английского
      },
      ru: {
        'nav.services': 'Услуги',
        'nav.about': 'О нас',
        'nav.contact': 'Контакты',
        'hero.title': 'Создаем <span class="highlight">диджитал</span> атмосферу',
        'hero.subtitle': 'Помогаем бизнесу расти в онлайн-пространстве.',
        'hero.text': 'Мы готовим мощные digital-стратегии, разрабатываем продающие сайты, запускаем эффективную рекламу и продвигаем бренды в социальных сетях.',
        'payment.text': 'Принимаем <span class="highlight">50+</span> различных способов оплаты',
        'hero.cta': 'Обсудить проект',
        'contact.title': 'Свяжитесь с нами',
        'contact.name': 'Имя',
        'contact.email': 'Электронная почта',
        'contact.message': 'Сообщение',
        'contact.send': 'Отправить',
        'services.branding.title': 'Брендинг и дизайн',
        'services.branding.item1': 'Разработка логотипа, фирменного стиля',
        'services.branding.item2': 'Создание презентаций и рекламных материалов',
        'services.layout.title': 'Верстка',
        'services.layout.item1': 'Лендинги, корпоративные сайты, магазины',
        'services.layout.item2': 'Удобный интерфейс, адаптивный дизайн, SEO-оптимизация',
        'services.ads.title': 'Реклама',
        'services.ads.item1': 'Настройка Google Ads, FB/INST/TG',
        'services.ads.item2': 'Анализ аудитории и повышение конверсии',
        'services.seo.title': 'SEO-продвижение',
        'services.seo.item1': 'Комплексное продвижение в поисковиках',
        'services.seo.item2': 'Увеличение органического трафика',
        'services.seo.item3': 'Оптимизация контента и мета-тегов',
        'services.content.title': 'Контент-маркетинг',
        'services.content.item1': 'Ведение соцсетей, создание контента, вовлечение аудитории',
        'services.content.item2': 'Разработка стратегии продвижения',
        'services.development.title': 'Разработка',
        'services.development.item1': 'Создание веб- и мобильных приложений',
        'services.development.item2': 'Разработка чат-ботов и TMA',
        'services.development.item3': 'Подключение БД и разработка back-end',
        'features.title': 'Открываем второе дыхание вашему бизнесу',
        'features.item1.title': 'Знаем свое дело',
        'features.item1.text': 'Профессионализм, отточенный годами: делаем сложное простым.',
        'features.item2.title': 'Создаем с душой',
        'features.item2.text': 'Креатив, который работает: проекты, выделяющиеся среди конкурентов.',
        'features.item3.title': 'Выполняем в сроки',
        'features.item3.text': 'Четкие сроки — соблюдаем дедлайны без накладок.',
        'features.footer': '<span class="highlight">Целая <span class="green">галактика технологий</span></span> в арсенале',
        'tech.languages': 'Языки программирования',
        'tech.web_basics': 'Веб-основа',
        'tech.frontend': 'Фронтенд-экосистема',
        'tech.tools': 'Инструменты',
        'tech.cloud': 'Облака и инфраструктура',
        'tech.backend': 'Бэкенд-стек',
        'tech.cms': 'CMS и E-commerce',
        'tech.api': 'API',
        'tech.databases': 'Базы данных',
        'tech.design': 'Дизайн-инструменты',
        'tech.web3': 'Web3-инструменты',
        'banner.title': 'От <span>MVP</span> до экосистемы',
        'banner.subtitle': 'Под ваш бюджет, задачи и масштабы.',
        'banner.description': 'От продвинутого лендинга до многофункциональной платформы: разрабатываем так, чтобы вы получили максимум.',
        'banner.button': 'Связаться с нами',
        'advantage.title': 'Всё, чтобы <span class="green">ваш проект</span> не просто существовал, а приносил деньги.',
        'advantage.responsiveness_title': "Адаптивность",
        'advantage.responsiveness_text': "Безупречное отображение на всех устройствах — ваш сайт всегда выглядит профессионально",
        'advantage.colors_title': "Цветовые решения",
        'advantage.colors_text': "Эргономичные палитры, которые не раздражают, а вовлекают",
        'advantage.multilingual_title': "Мультиязычность",
        'advantage.multilingual_text': "Преодолеваем языковые барьеры — общаемся с клиентами на их языке",
        'advantage.speed_title': "Скорость",
        'advantage.speed_text': "Молниеносная загрузка: удерживаем пользователей без раздражающих ожиданий",
        'advantage.optimization_title': "Оптимизация",
        'advantage.optimization_text': "Встроенный SEO-каркас: платформа сразу готова продвигать ваш бизнес в поиске",
        'advantage.security_title': "Безопасность",
        'advantage.security_text': "Защита как в банке: HTTPS, фильтрация DDoS и регулярное резервное копирование",
        "info.title": "Что-нибудь ещё?",
        "info.text": "Остальное обсудим в личной переписке.",
        "info.button": "Обсудить проект",
        "info.work_hours.title": "Режим работы",
        "info.work_hours.text": "Круглосуточно",
        "info.night_response.title": "Ночью отвечаю",
        "info.night_response.text": "В течение 3 часов",
        'feedback.title': "Свяжемся, <br>чтобы обсудить <br>детали",
        'feedback.also': "А также:",
        'feedback.benefit1': "Расскажем про возможности",
        'feedback.benefit2': "Проведём анализ текущего сайта",
        'feedback.benefit3': "Определим цели и задачи проекта",
        'feedback.benefit4': "Обсудим сроки на разработку",
        'feedback.benefit5': "Пришлём 3 варианта КП",
        'feedback.contact_preference': "Как вам удобнее связаться?",
        'feedback.call': "Звонок",
        'feedback.telegram': "Telegram",
        'feedback.whatsapp': "WhatsApp",
        'feedback.name': "Ваше имя",
        'feedback.phone': "+38 (099) 999-99-99",
        'feedback.submit_btn': "Свяжитесь со мной",
        'feedback.agreement': "Нажимая кнопку «Свяжитесь со мной», вы соглашаетесь с политикой обработки персональных данных"
        // ... остальные переводы для русского
      },
      ua: {
        'nav.services': 'Послуги',
        'nav.about': 'Про нас',
        'nav.contact': 'Контакти',
        'hero.title': 'Створюємо <span class="highlight">діджитал</span> атмосферу',
        'hero.subtitle': 'Допомагаємо бізнесу рости в онлайн-просторі.',
        'hero.text': 'Ми готуємо потужні digital-стратегії, розробляємо продаючі сайти, запускаємо ефективну рекламу та просуваємо бренди в соціальних мережах.',
        'payment.text': 'Приймаємо <span class="highlight">50+</span> різних способів оплати',
        'hero.cta': 'Обговорити проект',
        'contact.title': "Зв'яжіться з нами",
        'contact.name': "Ім'я",
        'contact.email': 'Електронна пошта',
        'contact.message': 'Повідомлення',
        'contact.send': 'Надіслати',
        'services.branding.title': 'Брендинг та дизайн',
        'services.branding.item1': 'Розробка логотипу, фірмового стилю',
        'services.branding.item2': 'Створення презентацій та рекламних матеріалів',
        'services.layout.title': 'Верстка',
        'services.layout.item1': 'Лендінги, корпоративні сайти, магазини',
        'services.layout.item2': 'Зручний інтерфейс, адаптивний дизайн, SEO-оптимізація',
        'services.ads.title': 'Реклама',
        'services.ads.item1': 'Налаштування Google Ads, FB/INST/TG',
        'services.ads.item2': 'Аналіз аудиторії та підвищення конверсії',
        'services.seo.title': 'SEO-просування',
        'services.seo.item1': 'Комплексне просування в пошукових системах',
        'services.seo.item2': 'Збільшення органічного трафіку',
        'services.seo.item3': 'Оптимізація контенту та мета-тегів',
        'services.content.title': 'Контент-маркетинг',
        'services.content.item1': 'Ведення соцмереж, створення контенту, залучення аудиторії',
        'services.content.item2': 'Розробка стратегії просування',
        'services.development.title': 'Розробка',
        'services.development.item1': 'Створення веб- та мобільних додатків',
        'services.development.item2': 'Розробка чат-ботів та TMA',
        'services.development.item3': 'Підключення БД та розробка back-end',
        'features.title': 'Відкриваємо друге дихання вашому бізнесу',
        'features.item1.title': 'Знаємо свою справу',
        'features.item1.text': 'Професіоналізм, відточений роками: робимо складне простим.',
        'features.item2.title': 'Створюємо з душею',
        'features.item2.text': 'Креатив, який працює: проекти, що виділяються серед конкурентів.',
        'features.item3.title': 'Виконуємо в строк',
        'features.item3.text': 'Чіткі терміни - дотримуємося дедлайнів без накладок.',
        'features.footer': '<span class="highlight">Ціла <span class="green">галактика технологій</span></span> в арсеналі',
        'tech.languages': 'Мови програмування',
        'tech.web_basics': 'Веб-основа',
        'tech.frontend': 'Фронтенд-екосистема',
        'tech.tools': 'Інструменти',
        'tech.cloud': 'Хмари та інфраструктура',
        'tech.backend': 'Бекенд-стек',
        'tech.cms': 'CMS та E-commerce',
        'tech.api': 'API',
        'tech.databases': 'Бази даних',
        'tech.design': 'Інструменти дизайну',
        'tech.web3': 'Web3-інструменти',
        'banner.title': 'Від <span>MVP</span> до екосистеми',
        'banner.subtitle': 'Під ваш бюджет, задачі та масштаби.',
        'banner.description': 'Від просунутого лендингу до багатофункціональної платформи: розробляємо так, щоб ви отримали максимум.',
        'banner.button': "Зв'язатися з нами",
        'advantage.title': 'Все, щоб <span class="green">ваш проект</span> не просто існував, а приносив прибуток.',
        'advantage.responsiveness_title': "Адаптивність",
        'advantage.responsiveness_text': "Бездоганне відображення на всіх пристроях — ваш сайт завжди виглядає професійно",
        'advantage.colors_title': "Кольорові рішення",
        'advantage.colors_text': "Ергономічні палітри, які не дратують, а залучають",
        'advantage.multilingual_title': "Багатомовність",
        'advantage.multilingual_text': "Подолаємо мовні бар'єри — спілкуємося з клієнтами їхньою мовою",
        'advantage.speed_title': "Швидкість",
        'advantage.speed_text': "Блискавичне завантаження: утримуємо користувачів без дратівливих очікувань",
        'advantage.optimization_title': "Оптимізація",
        'advantage.optimization_text': "Вбудована SEO-структура: платформа готова просувати ваш бізнес у пошуку",
        'advantage.security_title': "Безпека",
        'advantage.security_text': "Захист як у банку: HTTPS, фільтрація DDoS та регулярне резервне копіювання",
        "info.title": "Ще щось?",
        "info.text": "Решту обговоримо в особистому листуванні.",
        "info.button": "Обговорити проект",
        "info.work_hours.title": "Графік роботи",
        "info.work_hours.text": "Цілодобово",
        "info.night_response.title": "Вночі відповідаю",
        "info.night_response.text": "Протягом 3 годин",
        'feedback.title': "Зв'яжемося, <br>щоб обговорити <br>деталі",
        'feedback.also': "А також:",
        'feedback.benefit1': "Розкажемо про можливості",
        'feedback.benefit2': "Проведемо аналіз поточного сайту",
        'feedback.benefit3': "Визначимо цілі та задачі проекту",
        'feedback.benefit4': "Обговоримо терміни розробки",
        'feedback.benefit5': "Надішлемо 3 варіанти КП",
        'feedback.contact_preference': "Як вам зручніше зв'язатися?",
        'feedback.call': "Дзвінок",
        'feedback.telegram': "Telegram",
        'feedback.whatsapp': "WhatsApp",
        'feedback.name': "Ваше ім'я",
        'feedback.phone': "+38 (099) 999-99-99",
        'feedback.submit_btn': "Зв'яжіться зі мною",
        'feedback.agreement': "Натискаючи кнопку «Зв'яжіться зі мною», ви погоджуєтесь з політикою обробки персональних даних"
        // ... остальные переводы для украинского
      }
    };

    // Инициализация локализации
    function init() {
      if (!langSelect) return;

      setupLanguageSelector();
      initLanguage();
      addTranslationStyles();
    }

    function setupLanguageSelector() {
      langSelect.addEventListener('change', handleLanguageChange);
    }

    function handleLanguageChange(e) {
      translatePage(e.target.value);
    }

    function updateSelectedFlag() {
      if (!flagContainer || !langSelect) return;

      const selectedOption = langSelect.options[langSelect.selectedIndex];
      flagContainer.innerHTML = `
        <img src="${selectedOption.dataset.icon}" 
             alt="${selectedOption.text}" 
             class="lang-flag-icon">
      `;
    }

    function translatePage(lang) {
      try {
        document.documentElement.classList.add('translating');

        if (!translations[lang]) {
          console.warn(`Language ${lang} not found, falling back to 'en'`);
          lang = CONFIG.defaultLanguage;
        }

        document.querySelectorAll('[data-i18n]').forEach(updateElementTranslation.bind(null, lang));
        updatePageMetadata(lang);

      } catch (error) {
        console.error('Translation error:', error);
      } finally {
        setTimeout(() => {
          document.documentElement.classList.remove('translating');
        }, CONFIG.translationSpeed);
      }
    }

    function updateElementTranslation(lang, el) {
      const key = el.getAttribute('data-i18n');
      if (!translations[lang][key]) {
        console.warn(`Translation key ${key} not found for language ${lang}`);
        return;
      }

      if (!el.dataset.original) {
        el.dataset.original = el.innerHTML;
      }

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        updateInputTranslation(el, lang);
      } else {
        el.innerHTML = translations[lang][key];
      }
    }

    function updateInputTranslation(el, lang) {
      const placeholderKey = el.getAttribute('data-i18n-placeholder');
      if (placeholderKey && translations[lang][placeholderKey]) {
        el.placeholder = translations[lang][placeholderKey];
      }

      const valueKey = el.getAttribute('data-i18n-value');
      if (valueKey && translations[lang][valueKey]) {
        el.value = translations[lang][valueKey];
      }
    }

    function updatePageMetadata(lang) {
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);

      if (langSelect) {
        langSelect.value = lang;
      }

      updateSelectedFlag();
      dispatchLanguageChangedEvent(lang);
    }

    function dispatchLanguageChangedEvent(lang) {
      const event = new CustomEvent('languageChanged', {
        detail: { language: lang }
      });
      document.dispatchEvent(event);
    }

    function initLanguage() {
      try {
        let savedLang = localStorage.getItem('lang');

        if (!savedLang) {
          const browserLang = navigator.language.split('-')[0];
          savedLang = translations[browserLang] ? browserLang : CONFIG.defaultLanguage;
        }

        if (!translations[savedLang]) {
          savedLang = CONFIG.defaultLanguage;
        }

        translatePage(savedLang);

      } catch (error) {
        console.error('Language initialization error:', error);
        translatePage(CONFIG.defaultLanguage);
      }
    }

    function addTranslationStyles() {
      const style = document.createElement('style');
      style.textContent = `
        html.translating [data-i18n] {
          transition: opacity ${CONFIG.translationSpeed}ms ease;
          opacity: 0.5;
        }
        html.translating [data-i18n]:hover {
          opacity: 0.8;
        }
      `;
      document.head.appendChild(style);
    }

    return { init };
  })();

  // ========== Модуль анимации ==========
  const AnimationManager = (() => {
    // Инициализация анимаций
    function init() {
      initAstronautParallax();
      // Анимация шаттла удалена по вашему запросу
    }

    function initAstronautParallax() {
      const heroRight = document.querySelector('.hero-right');
      if (!heroRight) return;

      heroRight.addEventListener('mousemove', handleMouseMove);
      heroRight.addEventListener('mouseleave', resetPosition);
    }

    function handleMouseMove(e) {
      const container = e.currentTarget;
      const astronaut = container.querySelector('.astronaut');
      const blob = container.querySelector('.blob-bg');

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;

      const mouseX = e.clientX - containerRect.left - centerX;
      const mouseY = e.clientY - containerRect.top - centerY;

      const moveX = mouseX * CONFIG.parallaxIntensity;
      const moveY = mouseY * CONFIG.parallaxIntensity;

      astronaut.style.transform = `translate(${moveX}px, ${moveY}px)`;
      blob.style.transform = `translate(${-moveX * CONFIG.blobIntensity}px, ${-moveY * CONFIG.blobIntensity}px)`;
    }

    function resetPosition(e) {
      const container = e.currentTarget;
      container.querySelector('.astronaut').style.transform = 'translate(0, 0)';
      container.querySelector('.blob-bg').style.transform = 'translate(0, 0)';
    }

    return { init };
  })();

  // ========== Модуль формы ==========
  const FormManager = (() => {
    function init() {
      const contactForm = document.getElementById('contactForm');
      if (!contactForm) return;

      contactForm.addEventListener('submit', handleFormSubmit);
    }

    function handleFormSubmit(e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const message = formatFormData(formData);

      // Замените на реальный username вашего бота в Telegram
      window.open(`https://t.me/your_bot_username?text=${message}`, '_blank');
    }

    function formatFormData(formData) {
      return Array.from(formData.entries())
        .map(([key, value]) => `${encodeURIComponent(key)}: ${encodeURIComponent(value)}`)
        .join('%0A');
    }

    return { init };
  })();

  // ========== Модуль модального окна обратной связи ==========
  const FeedbackModalManager = (() => {
    let modal, closeBtn, contactBtns, contactMethodInput, form;

    function init() {
      modal = document.getElementById('feedbackModal');
      closeBtn = document.getElementById('closeModal');
      contactBtns = document.querySelectorAll('.contact-btn');
      contactMethodInput = document.getElementById('contactMethod');
      form = document.getElementById('feedbackForm');

      if (!modal || !closeBtn || !form) return;

      document.querySelectorAll('.feedback-btn').forEach(btn => {
        btn.addEventListener('click', openModal);
      });

      closeBtn.addEventListener('click', closeModal);

      contactBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          contactBtns.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          contactMethodInput.value = btn.dataset.method;
        });
      });

      form.addEventListener('submit', handleSubmit);

      window.addEventListener('click', e => {
        if (e.target === modal) closeModal();
      });
    }

    function openModal() {
      modal.style.display = 'block';
      setTimeout(() => modal.classList.add('show'), 5);
    }

    function closeModal() {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }

    function handleSubmit(e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Здесь можно сделать отправку на сервер или другое действие
      alert('Форма отправлена! \nДанные: ' + JSON.stringify(data, null, 2));
      closeModal();
    }

    return { init };
  })();

  // ========== Модуль бургер-меню ==========
  const BurgerMenuManager = (() => {
    let burgerBtn, navMenu, navLinks;

    function init() {
      burgerBtn = document.querySelector('.burger-btn');
      navMenu = document.querySelector('.main-nav');
      navLinks = document.querySelectorAll('.main-nav a');

      if (!burgerBtn || !navMenu) return;

      // Инициализация событий
      burgerBtn.addEventListener('click', toggleMenu);
      
      navLinks.forEach(link => {
        link.addEventListener('click', closeOnLinkClick);
      });

      // Закрытие при клике вне меню
      document.addEventListener('click', closeOnOutsideClick);
    }

    function toggleMenu() {
      burgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll'); // Блокировка скролла
    }

    function closeMenu() {
      burgerBtn.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }

    function closeOnLinkClick(e) {
      if (window.innerWidth <= 768) { // Только для мобильных
        closeMenu();
      }
    }

    function closeOnOutsideClick(e) {
      const isClickInside = navMenu.contains(e.target) || burgerBtn.contains(e.target);
      if (!isClickInside && navMenu.classList.contains('active')) {
        closeMenu();
      }
    }

    return { init };
  })();

  // ========== Модуль анимации .service-item при скролле ==========
  const ServiceItemAnimator = (() => {
    let observer;

    function init() {
      const items = document.querySelectorAll('.service-item, .advantage-item');
      if (!items.length) return;

      observer = new IntersectionObserver(onIntersection, {
        threshold: 0.15,
      });

      items.forEach(item => observer.observe(item));
    }

    function onIntersection(entries) {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Плавное поочерёдное появление
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150);

          observer.unobserve(entry.target); // Отключить отслеживание после появления
        }
      });
    }

    return { init };
  })();

  // ========== Инициализация всех модулей ==========
  function initApp() {
    ThemeManager.init();
    LocalizationManager.init();
    AnimationManager.init();
    FormManager.init();
    FeedbackModalManager.init();
    BurgerMenuManager.init();
    ServiceItemAnimator.init();
  }

  initApp();
});
