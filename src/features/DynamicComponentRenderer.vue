<template>
  <div class="dynamic-viewer">
    <h1>🧪 Vue Playground Showcase</h1>

    <p class="vue-solve-blurb">
      Vue makes building interactive, dynamic web apps smooth and fun — reactive data, reusable components, and intuitive state management all out-of-the-box.
    </p>

    <h2>🔄 View Swapper</h2>
    <p class="random-msg">{{ randomMsg }}</p>

    <div class="toggle-buttons">
      <button @click="show('UserProfile')" :class="{ active: currentView === 'UserProfile' }">👤 Profile</button>
      <button @click="show('TodoApp')" :class="{ active: currentView === 'TodoApp' }">✅ Todo App</button>
      <button @click="show('UserSettings')" :class="{ active: currentView === 'UserSettings' }">⚙️ Settings</button>
      <button @click="show('UserPosts')" :class="{ active: currentView === 'UserPosts' }">📝 Posts</button>
      <button @click="show('DailyVueTip')" :class="{ active: currentView === 'DailyVueTip' }">💡 Tips</button>
      <button @click="show('ChartDashboard')" :class="{ active: currentView === 'ChartDashboard' }">📊 Charts</button>

    </div>

    <transition name="fade" mode="out-in" @after-enter="animateSwitchCount">
      <component
        :is="whatToShow"
        v-bind="currentView === 'UserProfile' ? userInfo : {}"
        :key="currentView"
      />
    </transition>

    <p class="switch-count" :class="{ animate: countAnimating }">
      Component switched <strong>{{ switchCount }}</strong> times.
    </p>

    <p class="footer-note">
      Built by Phathu 💻 | Water & Juice powered
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import UserProfile from '@/playground/UserProfile.vue'
import UserSettings from '@/playground/UserSettings.vue'
import UserPosts from '@/playground/UserPosts.vue'
import DailyVueTip from '@/components/DailyVueTip.vue'
import ChartDashboard from '@/features/ChartDashboard.vue'
import TodoApp from '@/features/TodoApp.vue'

const currentView = ref('UserProfile')
const switchCount = ref(0)
const countAnimating = ref(false)

const allViews = {
  UserProfile,
  UserSettings,
  UserPosts,
  DailyVueTip,
  ChartDashboard,
  TodoApp,
}

const whatToShow = computed(() => allViews[currentView.value] || null)

function show(viewName) {
  if (viewName !== currentView.value) {
    currentView.value = viewName
    switchCount.value++
  }
}

function animateSwitchCount() {
  countAnimating.value = true
  setTimeout(() => {
    countAnimating.value = false
  }, 600)
}

const userInfo = {
  userName: 'Phathutshedzo Rakhunwana',
  email: 'phathurakhunwana@gmail.com',
  bio: 'Front-end Wiz. WordPress maestro. Juice over Java ☕❌.'
}

const messages = [
  "Vue is dope, just sayin.",
  "Water + Code = Power.",
  "Don't forget to stretch your neck!",
  "Debugging is like being a detective... in your own code.",
  "Juice gang > Coffee crew 🧃",
  "Switch views, see Vue magic happen!",
  "Reactive, flexible, and fun — Vue’s got you."
]
const randomMsg = ref(messages[Math.floor(Math.random() * messages.length)])
</script>

<style scoped>
.dynamic-viewer {
  background-color: #d0f0fd;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
  max-width: 700px;
  margin: 0 auto;
  color: #005b99;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
}

h1 {
  margin-bottom: 0.3rem;
}

.vue-solve-blurb {
  font-style: italic;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #004a80;
  border-left: 4px solid #007acc;
  padding-left: 0.8rem;
}

h2 {
  margin-top: 1rem;
  margin-bottom: 0.2rem;
  color: #00497a;
}

.random-msg {
  font-style: italic;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: #007acc;
}

.toggle-buttons {
  margin-bottom: 1.5rem;
}

button {
  margin-right: 10px;
  padding: 0.5rem 1.2rem;
  background-color: #007acc;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease;
  user-select: none;
}

button:hover {
  background-color: #005a9e;
}

button.active {
  background-color: #003f6f;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.switch-count {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #003f6f;
  transition: transform 0.3s ease;
  display: inline-block;
}

.switch-count.animate {
  transform: scale(1.3);
  color: #007acc;
}

.footer-note {
  margin-top: 2rem;
  font-size: 0.8rem;
  text-align: center;
  color: #004a7c;
  font-style: italic;
}

.dark .dynamic-viewer {
  background-color: #0b1e2d; /* Dark blue/gray background */
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.6); /* Slightly stronger glow */
  color: #8abdeb; /* Light blue text */
  user-select: none;
}

.dark .dynamic-viewer h1 {
  color: #cde6ff; /* Lighter heading */
  margin-bottom: 0.3rem;
}

.dark .dynamic-viewer .vue-solve-blurb {
  color: #a3c9f1;
  border-left-color: #5693e3;
  padding-left: 0.8rem;
  font-style: italic;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.dark .dynamic-viewer h2 {
  color: #9ac4ff;
  margin-top: 1rem;
  margin-bottom: 0.2rem;
}

.dark .dynamic-viewer .random-msg {
  color: #82aaff;
  font-style: italic;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.dark .dynamic-viewer .toggle-buttons {
  margin-bottom: 1.5rem;
}

.dark .dynamic-viewer button {
  background-color: #5687e1;
  color: white;
  margin-right: 10px;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease;
  user-select: none;
}

.dark .dynamic-viewer button:hover {
  background-color: #3b5fc1;
}

.dark .dynamic-viewer button.active {
  background-color: #23428a;
}

.dark .dynamic-viewer .switch-count {
  color: #acc6ff;
  transition: transform 0.3s ease;
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.dark .dynamic-viewer .switch-count.animate {
  transform: scale(1.3);
  color: #a3bffb;
}

.dark .dynamic-viewer .footer-note {
  color: #9ab7e5;
  margin-top: 2rem;
  font-size: 0.8rem;
  text-align: center;
  font-style: italic;
}

</style>
