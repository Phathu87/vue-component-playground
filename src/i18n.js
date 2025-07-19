import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import de from './locales/de.json'
import ve from './locales/ve.json'
import xh from './locales/xh.json'
import zu from './locales/zu.json'
import st from './locales/st.json'
import tn from './locales/tn.json'
import ts from './locales/ts.json'
import af from './locales/af.json'

// Translations
const messages = {
  en,
  fr,
  es,
  de,
  ve,
  xh,
  zu,
  st,
  tn,
  ts,
  af,
}

const i18n = createI18n({
  locale: localStorage.getItem('preferredLanguage') || 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
