<template>
  <div :class="['wrapper', { dark: isDarkMode }]">
   <WelcomeModal v-if="showWelcome" @close="showWelcome = false" />
    <AppHeader 
      :active-view="whichOneNow"
      v-model:loggedIn="userLoggedIn" 
      @change-view="whichOneNow = $event" 
      @login="handleLogin"
      @logout="userLoggedIn = false"
    />

    <main v-if="userLoggedIn">
      <h1>🧪 Component Playground</h1>
      <p>
        Welcome to the Vue playground, where you get to mess around with different components! 
        Pick a demo from the dropdown, and watch it come to life.
      </p>

      <label for="compSwitch">Pick a component to test drive:</label>
      <select id="compSwitch" v-model="whichOneNow">
        <option disabled value="">-- Select a Demo --</option>
        <option value="DynamicDemo">🎭 Dynamic Component</option>
        <option value="FormWizard">📋 Form Validation</option>
        <option value="NameSniffer">🔍 Filter Users</option>
        <option value="ClickBoi">🔢 Counter Fun</option>
      </select>

      <div class="preview-area">
        <component :is="loadThisGuy" />
      </div>
    </main>

    <main v-else class="login-prompt">
      <p class="big-msg">🔐 Please log in to access the components</p>
    </main>

     <main class="main-view">
      <component :is="currentComponent" />
    </main>

    <WelcomeModal 
      v-if="showWelcome" 
      :show="showWelcome" 
      @close="showWelcome = false"
    />

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue'


// Components
import AppHeader from './layouts/Header.vue'
import AppFooter from './layouts/Footer.vue'
import HomeView from './views/HomeView.vue'
import MiniGames from './views/MiniGames.vue'
import WelcomeModal from './components/WelcomeModal.vue'


//App Views
import DynamicDemo from './features/DynamicComponentRenderer.vue'
import FormWizard from './playground/FormValidation.vue'
import NameSniffer from './playground/TeamExplorer..vue'
import ClickBoi from './playground/ClickBoi.vue'
import ChartDashboard from './features/ChartDashboard.vue'
import WhatThisAppShows from './components/WhatThisAppShows.vue'

// State
const userLoggedIn = ref(false)
const whichOneNow = ref('Home') // Default view
const showWelcome = ref(false)

// When user logs in
function handleLogin(user) {
  userLoggedIn.value = true
  console.log('Logged in user:', user.email)
  showWelcome.value=true

  const alreadySeenModal = localStorage.getItem('welcomeDismissed')
  if (!alreadySeenModal) {
    showWelcome.value = true
  }
}

onMounted(() => {
  const alreadyVisited = localStorage.getItem('welcomeDismissed')
  if (!alreadyVisited) {
    showWelcome.value = true
  }
})


// Component map
const loadThisGuy = computed(() => {
  return {
    HomeView: HomeView,
    DynamicDemo,
    FormWizard,
    NameSniffer,
    ClickBoi,
    ChartDashboard,
    WhatThisAppShows,
    MiniGames,

  }[whichOneNow.value] || null
})
</script>

<style scoped>

.dynamic-viewer {
  background-color: var(--card-bg);
  color: var(--text);
}
.wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

h1 {
  margin-bottom: 1.5rem;
  color: #000000;
  font-weight: 700;
}

/* Dark mode styles */
.dark h1 {
  color: #ffffff; /* Manual dark mode override */
}

label, p {
  color: var(--text);
  font-size: 1rem;
}

label {
  display: block;
  margin: 1.5rem 0 0.5rem;
  font-weight: 600;
}

select {
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #aaa;
  background-color: #fdfdfd;
  cursor: pointer;
}

.preview-area {
  margin-top: 2rem;
  background: #f5f3f3;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.login-prompt {
  padding: 4rem 2rem;
  text-align: center;
}

.big-msg {
  font-size: 1.2rem;
  color: #333;
}

:root {
  --bg: #f7faff;
  --text: #0532c7;
  --card-bg: #ffffff;
  --input-bg: #ffffff;
  --border: #ccc;
  --highlight: #f59e0b;
}

.dark {
  --bg: #1a1b1e;
  --text: #e0e0e0;
  --card-bg: #2a2b2e;
  --input-bg: #1f2023;
  --border: #444;
  --highlight: #f59e0b;
}

.darkselect {
  background-color: var(--input-bg);
  color: var(--text);
  border: 1px solid var(--border);
}

.darkpreview-area {
  background: var(--card-bg);
  color: var(--text);
  border: 1px solid var(--border);
}
</style>
