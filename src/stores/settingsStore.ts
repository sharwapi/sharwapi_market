import { defineStore } from 'pinia';
import { ref, watch, onMounted } from 'vue';
import i18n from '@/i18n';

const getInitialTheme = (): boolean => {
    const savedTheme = localStorage.getItem('user-theme');
    if (savedTheme) {
        return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const useSettingsStore = defineStore('settings', () => {
    const isDark = ref<boolean>(getInitialTheme());
    
    const savedLocale = localStorage.getItem('user-locale');
    const currentLocale = ref(savedLocale || 'zh-CN');

    if (i18n.global.locale.value !== currentLocale.value) {
        i18n.global.locale.value = currentLocale.value as any;
    }

    const toggleTheme = () => {
        isDark.value = !isDark.value;
    };
    
    const setLocale = (locale: string) => {
        currentLocale.value = locale;
        
        i18n.global.locale.value = locale as any;

        localStorage.setItem('user-locale', locale);
        
        console.log(`Language set to: ${locale}`); 
    }

    watch(isDark, (newValue) => {
        if (newValue) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('user-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('user-theme', 'light');
        }
    }, { immediate: true }); 

    return {
        isDark,
        currentLocale,
        toggleTheme,
        setLocale
    };
});