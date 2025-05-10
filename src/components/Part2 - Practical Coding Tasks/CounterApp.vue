<template>
  <div class="counter-box">
    <h3>Current Count: {{ howManyClicks }}</h3>

    <div class="btns">
      <button @click="increaseCount">Add One</button>
      <button @click="startOver">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// keeping track of how many times the button got clicked
const howManyClicks = ref(0)

const increaseCount = () => {
  howManyClicks.value++
}

const startOver = () => {
  howManyClicks.value = 0
}
</script>

<style scoped>
.counter-box {
  padding: 1rem;
  border: 1px solid #eee;
  background-color: #f8f8f8;
  border-radius: 8px;
  text-align: center;
}

.btns button {
  margin: 0.5rem;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>