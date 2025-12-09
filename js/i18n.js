// ============================================
// i18n - INTERNATIONALIZATION SYSTEM
// ============================================
class I18n {
    constructor() {
        this.currentLang = null;
        this.translations = {};
        this.supportedLanguages = ['en', 'es'];
        this.defaultLanguage = 'es';
        
        this.init();
    }
    
    async init() {
        // Detect browser language
        const browserLang = this.detectBrowserLanguage();
        
        // Load translations
        await this.loadTranslations();
        
        // Set initial language
        await this.setLanguage(browserLang);
        
        // Setup language switcher
        this.setupLanguageSwitcher();
    }
    
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0]; // Get 'en' from 'en-US'
        
        // Check if browser language is supported
        if (this.supportedLanguages.includes(langCode)) {
            return langCode;
        }
        
        return this.defaultLanguage;
    }
    
    async loadTranslations() {
        try {
            // Load English
            const enResponse = await fetch('lang/en.json');
            this.translations.en = await enResponse.json();
            
            // Load Spanish
            const esResponse = await fetch('lang/es.json');
            this.translations.es = await esResponse.json();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }
    
    async setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            lang = this.defaultLanguage;
        }
        
        this.currentLang = lang;
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update local storage
        localStorage.setItem('preferredLanguage', lang);
        
        // Translate all elements
        this.translatePage();
        
        // Update switcher state
        this.updateSwitcherState();
    }
    
    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                element.textContent = translation;
            }
        });
    }
    
    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }
    
    setupLanguageSwitcher() {
        const switcherHtml = `
            <div class="lang-switcher">
                <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
                <span class="lang-separator">/</span>
                <button class="lang-btn ${this.currentLang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
            </div>
        `;
        
        // Insert switcher in the center of footer
        const footerLinks = document.querySelector('.footer-links');
        if (footerLinks) {
            footerLinks.insertAdjacentHTML('beforeend', switcherHtml);
            
            // Add event listeners
            const langButtons = document.querySelectorAll('.lang-btn');
            langButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const lang = e.target.getAttribute('data-lang');
                    this.setLanguage(lang);
                });
            });
        }
    }
    
    updateSwitcherState() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// Initialize i18n when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new I18n();
});
