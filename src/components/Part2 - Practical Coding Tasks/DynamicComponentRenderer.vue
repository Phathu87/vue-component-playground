<template>
  <div class="dynamic-viewer">
    <h2>🔄 View Swapper</h2>

    <div class="toggle-buttons">
      <button @click="show('UserProfile')">👤 Profile</button>
      <button @click="show('UserSettings')">⚙️ Settings</button>
      <button @click="show('UserPosts')">📝 Posts</button>
    </div>

    <!-- Let the magic component appear -->
    <component :is="whatToShow" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// component imports
import UserProfile from './UserProfile.vue'
import UserSettings from './UserSettings.vue'
import UserPosts from './UserPosts.vue'

// name of the active view (by string)
const currentView = ref('UserProfile')

// quick-switcher function
function show(viewName) {
  currentView.value = viewName
}

// link names to actual components
const allViews = {
  UserProfile,
  UserSettings,
  UserPosts,
}

// get the actual component to render
const whatToShow = computed(() => allViews[currentView.value] || null)
</script>

<style scoped>
.dynamic-viewer {
  padding: 1rem;
}

.toggle-buttons {
  margin-bottom: 1rem;
}

button {
  margin-right: 10px;
  padding: 0.5rem 1rem;
  background-color: #eee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #ddd;
}
</style>
