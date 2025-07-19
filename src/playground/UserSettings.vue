<template>
  <SettingsPanel @language-changed="handleLanguageChange" />
    <h2>⚙️ {{ t('settings.title') }}</h2>

    <section class="setting">
      <label>
        <input type="checkbox" v-model="darkMode" @change="toggleTheme" />
        🌗 {{ t('settings.darkMode') }}
      </label>
    </section>

    <section class="setting">
      <label>
        <input type="checkbox" v-model="notifications" />
        🔔 {{ t('settings.notifications') }}
      </label>
    </section>

    <section class="setting">
      <p>🥤 {{ t('settings.beverage') }}</p>
      <label><input type="radio" value="Juice" v-model="beverage" /> {{ t('settings.juice') }}</label>
      <label><input type="radio" value="Coffee" v-model="beverage" /> {{ t('settings.coffee') }}</label>
      <label><input type="radio" value="Energy Drink" v-model="beverage" /> {{ t('settings.energy') }}</label>
    </section>

    <section class="setting">
      <p>🌐 {{ t('settings.language') }}</p>
      <select v-model="language">
        <option value="en">🇺🇸 English</option>
        <option value="fr">🇫🇷 French</option>
        <option value="es">🇪🇸 Spanish</option>
        <option value="de">🇩🇪 German</option>
        <option value="ve">🇿🇦 Tshivenda</option>
        <option value="xh">🇿🇦 Xhosa</option>
        <option value="zu">🇿🇦 Zulu</option>
        <option value="st">🇿🇦 Sesotho</option>
        <option value="tn">🇿🇦 Setswana</option>
        <option value="ts">🇿🇦 Tsonga</option>
        <option value="af">🇿🇦 Afrikaans</option>
        <option value="other">🌍 Other</option>
      </select>
    </section>

    <div class="summary">
       <p><strong>{{ t('settings.summaryTitle') }}</strong></p>
      <ul>
         <li>{{ t('settings.darkMode') }}: {{ darkMode ? $t('settings.enabled') : $t('settings.disabled') }}</li>
         <li>{{ t('settings.notifications') }}: {{ notifications ? $t('settings.on')  : $t('settings.off')  }}</li>
         <li>{{ t('settings.beverage') }}: {{ $t(beverage) }}</li>
         <li>{{ t('settings.language') }}: {{ languageName }}</li>
      </ul>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()


// Define emits so you can use it
const emit = defineEmits(['language-changed'])

const darkMode = ref(false)
const notifications = ref(true)
const beverage = ref('Juice')
const language = ref(  )

const languageName = computed(() => {
  return {
    en: 'English',
    fr: 'French',
    es: 'Spanish',
    de: 'German',
    ve: 'Tshivenda',
    xh: 'Xhosa',      
    zu: 'Zulu',
    st: 'Sesotho',
    tn: 'Setswana',
    ts: 'Tsonga',
    af: 'Afrikaans',
    other: 'Other'
  }[language.value] || 'Other'
})

// Load saved preferences from localStorage on mount
onMounted(() => {
  const savedLang = localStorage.getItem('preferredLanguage')
  if (savedLang && language.value !== savedLang) {
    applyLanguage(savedLang)
    language.value = savedLang
  }

  const savedDarkMode = localStorage.getItem('darkMode') === 'true'
  darkMode.value = savedDarkMode
  toggleTheme()
})

// Watch language changes and persist + apply
watch(language, (newLang) => {
  localStorage.setItem('preferredLanguage', newLang)
  applyLanguage(newLang)
  emit('language-changed', newLang)
})

// Apply language changes — here you can connect your i18n or reload UI texts
function applyLanguage(lang) {
  locale.value = lang
  localStorage.setItem('preferredLanguage', lang)
  console.log(`Switched to: ${lang}`)
}

function toggleTheme() {
  const root = document.documentElement
  if (darkMode.value) {
    root.classList.add('dark-mode')
  } else {
    root.classList.remove('dark-mode')
  }
}
function handleLanguageChange(newLang) {
  // Update your app-wide language setting or reload translations here
  console.log('New language selected:', newLang)
}
</script>

<style scoped>
.settings-panel {
  max-width: 600px;
  margin: 0 auto;
  background-color: #e1f4fd;
  border-radius: 12px;
  padding: 1.5rem;
  color: #003f6f;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  margin-bottom: 1.5rem;
  color: #00497a;
}

.setting {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin: 0.4rem 0;
  font-weight: 500;
  cursor: pointer;
}

select {
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid #aaa;
  margin-top: 0.5rem;
}

.summary {
  margin-top: 1.5rem;
  background-color: #cde8ff;
  padding: 1rem;
  border-radius: 8px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li::before {
  content: '✅ ';
}
</style>

<!-- Optional global dark mode CSS -->
<style>
:root.dark-mode {
  background-color: #1e1e1e;
  color: #f0f0f0;
}

:root.dark-mode .settings-panel {
  background-color: #2c2c2c;
  color: #e1e1e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

:root.dark-mode .settings-panel h2 {
  color: #79c0ff;
}

:root.dark-mode .setting p,
:root.dark-mode .setting label {
  color: #e7e6e6;
}

:root.dark-mode select,
:root.dark-mode input[type="radio"],
:root.dark-mode input[type="checkbox"] {
  background-color: #444;
  color: #f0f0f0;
  border: 1px solid #666;
}

:root.dark-mode .summary {
  background-color: #3a3a3a;
  border-radius: 8px;
  color: #ffffff;
}

:root.dark-mode ul li::before {
  content: '🌑 ';
}
:root.dark-mode ul {
  color: #ffffff;
}
</style>
