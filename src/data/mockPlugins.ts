import type { PluginCollection } from '@/types/Plugin';

// 模拟插件数据

export const mockPlugins: PluginCollection = {
    'mock-plugin-search': {
        name: "Mock Search Filter",
        author: "Dev Tester",
        description: "A highly efficient plugin to test the search bar functionality and responsiveness.",
        description_zh: "一个高效的插件，用于测试搜索栏功能和响应速度。",
        url: "https://github.com/mock/search-filter"
    },
    'mock-plugin-data-viz': {
        name: "Mock Data Visualization",
        author: "Sharwapi Team",
        description: "Simulated data visualization tool for testing large dataset rendering.",
        url: "https://github.com/mock/data-viz"
    },
    'mock-plugin-auth': {
        name: "Mock Authentication Helper",
        author: "Test User",
        description: "Provides fake authentication tokens for local development without connecting to the backend.",
        description_zh: "提供伪造的身份验证令牌，方便本地无需后端即可开发。",
        url: "https://github.com/mock/auth-helper"
    },
    'mock-plugin-auth2': {
        name: "Mock Authentication Helper",
        author: "Test User",
        description: "Provides fake authentication tokens for local development without connecting to the backend.",
        url: "https://github.com/mock/auth-helper"
    },
    'mock-plugin-auth3': {
        name: "Mock Authentication Helper",
        author: "Test User",
        description: "Provides fake authentication tokens for local development without connecting to the backend.",
        url: "https://github.com/mock/auth-helper"
    },
    'mock-plugin-auth4': {
        name: "Mock Authentication Helper",
        author: "Test User",
        description: "Provides fake authentication tokens for local development without connecting to the backend.",
        url: "https://github.com/mock/auth-helper"
    }
};