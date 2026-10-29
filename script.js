/* ==========================================================
   script.js - Language switcher for the bilingual portfolio
   Priority: ?lang= URL parameter > saved choice > browser language > English
   ========================================================== */
(function () {
  "use strict";

  var SUPPORTED = ["en", "fa"];
  var STORAGE_KEY = "site-lang";

  // Per-language <title> and meta description (important for search results)
  var META = {
    en: {
      title: "Jalal Ostadhadi Dehkordi | AI Engineer (Freelance & Remote)",
      description:
        "AI Engineer available for freelance and remote work: document data extraction, RAG chatbots, computer vision, and n8n automation."
    },
    fa: {
      title: "جلال استادهادی دهکردی | مهندس هوش مصنوعی (فریلنس و دورکار)",
      description:
        "مهندس هوش مصنوعی، آماده همکاری پروژه‌ای و دورکاری: استخراج داده از اسناد، چت‌بات RAG، بینایی ماشین و اتوماسیون با n8n."
    }
  };

  var buttons = document.querySelectorAll("[data-set-lang]");

  // localStorage can throw (private mode, blocked cookies), so every access is guarded
  function readSavedLang() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* Ignore: the site still works, the choice is just not remembered */
    }
  }

  function detectInitialLang() {
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (SUPPORTED.indexOf(fromUrl) !== -1) return fromUrl;

    var saved = readSavedLang();
    if (SUPPORTED.indexOf(saved) !== -1) return saved;

    var browserLang = (navigator.language || "en").toLowerCase();
    return browserLang.indexOf("fa") === 0 ? "fa" : "en";
  }

  function applyLang(lang) {
    var root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");

    document.title = META[lang].title;
    var descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", META[lang].description);

    // Keep screen readers informed about which button is active
    buttons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-set-lang") === lang;
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-set-lang");
      if (SUPPORTED.indexOf(lang) === -1) return;
      applyLang(lang);
      saveLang(lang);
    });
  });

  applyLang(detectInitialLang());
})();