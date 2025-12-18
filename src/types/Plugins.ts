export interface PluginMeta {
  name: string
  author: string
  description: string
  description_zh?: string
  url: string
}

export interface PluginCollection {
  [key: string]: PluginMeta
}

export interface PluginEntity extends PluginMeta {
  id: string
}
