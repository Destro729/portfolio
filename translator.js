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
                document.body.classList.add('ua');
                document.body.classList.remove('en');
                // Показати/сховати елементи з класами lang-ua/lang-en
                document.querySelectorAll('.lang-ua').forEach(el => el.style.display = 'block'); // або inline-block в залежності від CSS, але block безпечніше для тексту
                document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
            } else {
                document.body.classList.add('en');
                document.body.classList.remove('ua');
                document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'block');
                document.querySelectorAll('.lang-ua').forEach(el => el.style.display = 'none');
            }
            
            // Специфічні фікси для display властивостей, якщо вони inline
            document.querySelectorAll('span.lang-ua, a.lang-ua').forEach(el => {
                if(lang === 'ua') el.style.display = 'inline-block';
            });
            document.querySelectorAll('span.lang-en, a.lang-en').forEach(el => {
                if(lang === 'en') el.style.display = 'inline-block';
            });
        }
    };

    // Запускаємо при завантаженні
    document.addEventListener('DOMContentLoaded', () => {
        VersalTranslator.init();
    });

    // Експорт
    window.VersalTranslator = VersalTranslator;
})();
