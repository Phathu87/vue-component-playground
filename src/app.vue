<template>
  <div class="wrapper">
    <h1>🧪 Part 2: Component Playground</h1>
    <p>
      Welcome to the Vue playground, where you get to mess around with different components! 
      Pick a demo from the dropdown, and watch it come to life.
    </p>
    <p>
      Each component gets loaded on the fly, 
      keeping things clean and snappy, so you can jump straight into the action!
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Bringing in the task components
import ClickBoi from './components/Part2 - Practical Coding Tasks/CounterApp.vue'
import DynamicDemo from './components/Part2 - Practical Coding Tasks/DynamicComponentRenderer.vue'
import FormWizard from './components/Part2 - Practical Coding Tasks/FormValidation.vue'
import NameSniffer from './components/Part2 - Practical Coding Tasks/UserListFilter.vue'

// User choice tracker
const whichOneNow = ref('')

// Map component string keys to real imports
const loadThisGuy = computed(() => {
  return {
    DynamicDemo,
    FormWizard,
    NameSniffer,
    ClickBoi
  }[whichOneNow.value] || null
})
</script>

<style scoped>
.wrapper {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
}

h1 {
  margin-bottom: 1.5rem;
  color: #222;
  font-weight: 700;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

select {
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #aaa;
  background-color: #fff;
  cursor: pointer;
}

.preview-area {
  margin-top: 2rem;
  background: #f5f5f5;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
