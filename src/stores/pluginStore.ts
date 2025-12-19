import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PluginCollection, PluginEntity } from '@/types/Plugins'
import { mockPlugins } from '@/data/mockPlugins'

const IS_TEST_MODE = false

export const usePluginStore = defineStore('plugin', () => {
  const pluginsMap = ref<PluginCollection>({})
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const pluginList = computed<PluginEntity[]>(() => {
    return Object.entries(pluginsMap.value).map(([key, value]) => ({
      id: key,
      ...value,
    }))
  })

  const fetchPlugins = async () => {
    isLoading.value = true
    error.value = null

    if (IS_TEST_MODE) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))

        pluginsMap.value = mockPlugins
      } catch (err: unknown) {
        error.value = 'Mock data loading failed!'
        console.error(error.value, err)
      } finally {
        isLoading.value = false
      }
    } else {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/sharwapi/sharwapi_Plugins_Collection/main/plugins.json',
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: PluginCollection = await response.json()
        pluginsMap.value = data
      } catch (err: unknown) {
        error.value = (err as Error).message || 'Failed to fetch plugins'
        console.error(error.value)
      } finally {
        isLoading.value = false
      }
    }
  }

  return {
    pluginsMap,
    pluginList,
    isLoading,
    error,
    fetchPlugins,
  }
})
