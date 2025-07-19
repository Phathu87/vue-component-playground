import { createApp } from 'vue'
import App from './app.vue'
import './assets/theme.css'
import './assets/darkmode.css'
import { createI18n } from 'vue-i18n'

function loadLocaleMessages() {
  const locales = import.meta.glob('./locales/*.json', { eager: true })
  const messages = {}

  for (const path in locales) {
    const matched = path.match(/([a-z0-9-_]+)\.json$/i)
    if (matched && matched[1]) {
      messages[matched[1]] = locales[path].default
    }
  }

  return messages
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('preferredLanguage') || 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
})




const app = createApp(App)
app.use(i18n)
app.mount('#app')