<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useSettingsStore } from '@/stores/settingsStore';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const settingsStore = useSettingsStore();
const { isDark, currentLocale } = storeToRefs(settingsStore);
const { toggleTheme, setLocale } = settingsStore;

const { t } = useI18n();

const locales = [
    { code: 'zh-CN', name: '中文' },
    { code: 'en-US', name: 'English' },
];

const isLocaleDropdownOpen = ref(false);
const localeDropdownRef = ref<HTMLElement | null>(null);

const currentLocaleName = computed(() => {
    const locale = locales.find(l => l.code === currentLocale.value);
    return locale ? locale.name : currentLocale.value;
});

const handleLocaleSelect = (locale: string) => {
    setLocale(locale);
    isLocaleDropdownOpen.value = false; // 选择后关闭菜单
};

const handleClickOutside = (event: MouseEvent) => {
    // 检查点击事件是否发生在下拉菜单内部
    if (localeDropdownRef.value && !localeDropdownRef.value.contains(event.target as Node)) {
        isLocaleDropdownOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
  <div class="app-layout">
    <header class="top-bar">
      <div class="left-controls">
        <div class="branding">
          <img alt="Sharwapi Logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />
          <span class="site-title">Sharw's API Market</span>
        </div>
      </div>

      <div class="right-controls">
        <div class="theme-switch-wrapper">
          <label class="theme-switch" for="theme-checkbox">
            <input type="checkbox" id="theme-checkbox" :checked="isDark" @change="toggleTheme" />
            <div class="slider round">
              <span class="icon sun" :title="t('global.themeDark')">☀️</span>
              <span class="icon moon" :title="t('global.themeLight')">🌙</span>
            </div>
          </label>
        </div>
  
        <div class="custom-locale-select" ref="localeDropdownRef" @click.stop="isLocaleDropdownOpen = !isLocaleDropdownOpen">
              <div class="dropdown-display">
                  {{ currentLocaleName }}
                  <span class="dropdown-arrow" :class="{ 'open': isLocaleDropdownOpen }">▼</span>
              </div>

              <ul class="dropdown-options" v-if="isLocaleDropdownOpen">
                  <li 
                      v-for="lang in locales" 
                      :key="lang.code"
                      :class="{ 'selected': lang.code === currentLocale }"
                      @click="handleLocaleSelect(lang.code)"
                  >
                      {{ lang.name }}
                  </li>
              </ul>
          </div>

        <nav class="nav-links">
          <RouterLink to="/">{{ t('global.market') }}</RouterLink>
          <RouterLink to="/about">{{ t('global.about') }}</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
  position: sticky; 
  top: 0;
  z-index: 100;
}

.left-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.branding {
  display: flex;
  align-items: center;
  gap: 1rem; 
}

.custom-locale-select {
  position: relative;
  cursor: pointer;
  user-select: none;
  z-index: 100; 
}

.dropdown-display {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: border-color 0.2s;
}

.dropdown-display:hover {
  border-color: var(--color-primary);
}

.dropdown-arrow {
  font-size: 0.6rem;
  transition: transform 0.2s;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-options {
  position: absolute;
  top: 100%;
  right: 0;
  list-style: none;
  padding: 0;
  margin-top: 5px;
  min-width: 120px;
  border-radius: 6px;
  background: var(--color-background);
  border: 1px solid var(--color-border-hover);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.dropdown-options li {
  padding: 0.6rem 1rem;
  color: var(--color-text);
  transition: background-color 0.2s;
}

.dropdown-options li:hover {
  background-color: var(--color-background-soft);
}

.dropdown-options li.selected {
  background-color: var(--color-primary);
  color: var(--vt-c-white);
}

.dropdown-options li.selected:hover {
  background-color: color-mix(in srgb, var(--color-primary), black 10%);
}

.theme-switch-wrapper {
  display: flex;
  align-items: center;
  height: 40px;
}

.theme-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  cursor: pointer;
}

.theme-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-border);
  transition: 0.4s;
  border-radius: 34px;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  overflow: hidden;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--color-background-soft);
  transition: 0.4s;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:checked + .slider:before {
  transform: translateX(26px); 
}

.icon {
  font-size: 0.95rem;
  transition: opacity 0.4s;
  z-index: 1;
  width: 20px; 
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sun {
  opacity: 1; 
}

.moon {
  opacity: 0;
}

input:checked ~ .slider .sun {
  opacity: 0; 
}

input:checked ~ .slider .moon {
  opacity: 1; 
}

.theme-toggle-btn:hover {
  background-color: var(--color-background-mute);
}

.site-title {
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--color-heading);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--color-primary);
}

.nav-links a.router-link-active {
  color: var(--color-primary);
  font-weight: 700;
}

.main-content {
  background-color: var(--color-background);
  padding: 2rem;
}
</style>