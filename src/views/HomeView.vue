<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { usePluginStore } from '@/stores/pluginStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import type { PluginEntity } from '@/types/Plugins'

const pluginStore = usePluginStore()
const settingsStore = useSettingsStore()
const { pluginList, isLoading, error } = storeToRefs(pluginStore)
const { currentLocale } = storeToRefs(settingsStore)

const { t } = useI18n()

const searchTerm = ref('')

onMounted(() => {
  pluginStore.fetchPlugins()
})

const getLocalizedText = (plugin: PluginEntity, field: 'name' | 'description') => {
  const locale = currentLocale.value

  if (locale === 'zh-CN') {
    const zhKey = `${field}_zh` as keyof PluginEntity
    if (plugin[zhKey]) return plugin[zhKey]
  }

  if (locale === 'en-US') {
    const enKey = `${field}_en` as keyof PluginEntity
    if (plugin[enKey]) return plugin[enKey]
  }

  return plugin[field]
}

const filteredPluginList = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()
  if (!query) return pluginList.value

  return pluginList.value.filter((plugin) => {
    const defaultNameMatch = plugin.name.toLowerCase().includes(query)
    const defaultDescMatch = plugin.description.toLowerCase().includes(query)
    const authorMatch = plugin.author.toLowerCase().includes(query)

    const zhDescMatch = plugin.description_zh?.toLowerCase().includes(query) || false

    return defaultNameMatch || defaultDescMatch || authorMatch || zhDescMatch
  })
})

const isFilterEmpty = computed(() => {
  return (
    !isLoading.value && !error.value && filteredPluginList.value.length === 0 && !!searchTerm.value
  )
})
</script>

<template>
  <main class="market-container">
    <div class="search-wrapper">
      <input
        type="text"
        v-model="searchTerm"
        :placeholder="t('global.searchPlaceholder')"
        class="search-input"
      />
    </div>

    <div v-if="isLoading" class="status-msg">{{ t('global.loading') }}</div>
    <div v-else-if="error" class="status-msg error">{{ t('global.error') }} {{ error }}</div>

    <div v-else-if="isFilterEmpty" class="status-msg no-results">
      {{ t('global.noResults', { searchTerm: searchTerm }) }}
    </div>

    <div v-else class="plugin-grid">
      <div v-for="plugin in filteredPluginList" :key="plugin.id" class="plugin-card">
        <h3>{{ plugin.name }}</h3>
        <p class="author">{{ t('global.authorPrefix') }} {{ plugin.author }}</p>
        <p class="desc">{{ getLocalizedText(plugin, 'description') }}</p>
        <div class="actions">
          <a :href="plugin.url" target="_blank" class="btn">{{ t('global.viewRepo') }}</a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.search-wrapper {
  width: 90%;
  margin: 0 auto 2.5rem auto;
}

@media (min-width: 768px) {
  .search-wrapper {
    width: 60%;
  }
}

.search-input {
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 28px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  color: var(--color-text);
  font-size: 1rem;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.25);
}

.market-container {
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (min-width: 1024px) {
  .plugin-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.plugin-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;

  display: flex;
  flex-direction: column;
  height: 100%;
}

.plugin-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-border-hover);
}

h3 {
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.author {
  color: var(--color-text);
  opacity: 0.8;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.desc {
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.actions {
  margin-top: auto;
  padding-top: 1rem;
  text-align: left;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: var(--color-primary-hover);
}

.status-msg.no-results {
  color: var(--color-text-soft);
}

.status-msg {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: var(--color-text);
}
.error {
  color: red;
}
</style>
