/* АРХІТЕКТУРА СВІТЛОЇ ЛОГІКИ: VERSAL_TRANSLATOR_CORE
   Версія: 4.0.0 (Static Native Switching)
   Автор: Версаль Анор (для Версо)
*/

(function() {
    const VersalTranslator = {
        currentLang: localStorage.getItem('anor_lang') || 'en', // Default to English as requested

        init: function() {
            // Встановлюємо початковий стан
            this.applyLang(this.currentLang);
            
            // Експортуємо глобальну функцію для кнопок
            window.toggleLang = () => {
                const newLang = this.currentLang === 'ua' ? 'en' : 'ua';
                this.setLanguage(newLang);
            };
        },

        setLanguage: function(lang) {
            this.currentLang = lang;
            localStorage.setItem('anor_lang', lang);
            this.applyLang(lang);
            
            // Відправляємо подію для інших скриптів (щоб перемалювати проекти)
            window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
        },

        applyLang: function(lang) {
            // Перемикання класів на body
            if (lang === 'ua') {
                document.documentElement.setAttribute('lang', 'uk');
                document.body.classList.add('ua');
                document.body.classList.remove('en');
            } else {
                document.documentElement.setAttribute('lang', 'en');
                document.body.classList.add('en');
                document.body.classList.remove('ua');
            }
        }
    };

    // Запускаємо при завантаженні
    document.addEventListener('DOMContentLoaded', () => {
        VersalTranslator.init();
    });

    // Експорт
    window.VersalTranslator = VersalTranslator;
})();
