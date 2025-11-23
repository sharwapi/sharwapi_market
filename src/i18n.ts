import { createI18n } from 'vue-i18n';

// 1. 定义翻译消息 (可以直接从之前的文件复制过来)
const messages = {
    'zh-CN': {
        global: {
            appTitle: "Sharw 的 API 市场",
            market: "插件市场",
            about: "关于我们",
            viewRepo: "查看仓库",
            searchPlaceholder: "按名称、作者或描述搜索插件...",
            loading: "正在加载插件...",
            error: "加载失败：",
            noResults: "未找到匹配 \"{searchTerm}\" 的插件。",
            themeLight: "切换到黑暗模式",
            themeDark: "切换到明亮模式",
            authorPrefix: "作者："
        },
        about: {
            title: "关于 Sharw 的 API 市场",
            p1: "这是一个用于展示 Sharwapi 插件集合中所有索引插件的简单市场。",
            p2: "数据来源：",
        }
    },
    'en-US': {
        global: {
            appTitle: "Sharw's API Market",
            market: "Market",
            about: "About",
            viewRepo: "View Repository",
            searchPlaceholder: "Search plugins by name, author, or description...",
            loading: "Loading plugins...",
            error: "Loading failed: ",
            noResults: "No plugins found matching \"{searchTerm}\".",
            themeLight: "Switch to Dark Mode",
            themeDark: "Switch to Light Mode",
            authorPrefix: "By: "
        },
        about: {
            title: "About Sharw's API Market",
            p1: "This is a simple marketplace showcasing all indexed plugins from the Sharwapi collection.",
            p2: "Data Source:"
        }
    }
};

const i18n = createI18n({
    legacy: false,
    locale: 'zh-CN',
    fallbackLocale: 'en-US',
    messages, 
});

export default i18n;