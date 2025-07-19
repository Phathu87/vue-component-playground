<template>
  <div class="counter-game">
    <h1>🍹 Juice-Powered Counter Game</h1>
    <p>Clicks: <span class="click-count" :key="count" @animationend="resetAnimation" :class="{ 'pop': popAnim }">{{ count }}</span></p>

    <button @click="increment" class="btn-counter">Click me!</button>

    <transition name="fade" mode="out-in">
      <p v-if="showFact" key="fact" class="juice-fact">
        🧃 Juice Fact: {{ currentFact }}
      </p>
    </transition>

    <p class="tip">Keep clicking for more juice facts and fun! 😄</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const showFact = ref(false)
const currentFact = ref('')
const popAnim = ref(false)

const juiceFacts = [
  "Juice has more antioxidants than coffee ☕️",
  "Drinking juice can boost your creativity 💡",
  "Juice keeps your coding fingers nimble 🤓",
  "Juice powered the first Vue.js commit 🚀",
  "Juice > energy drinks for lasting focus ⚡️",
  "Orange juice is the official beverage of dev sprints 🍊",
  "Juice can help you debug faster 🐛",
  "Juice is the secret ingredient in every great app 🍹",
  "Juice helps you stay hydrated while coding 💧",
  "Juice is the fuel behind every successful project launch 🎉",
  "Juice is packed with vitamins to keep your brain sharp 🧠",
  "Juice can help you code through the night 🌙",
  "Juice is the ultimate coding companion 🧃",
  "Juice can improve your focus and concentration 🎯",
  "Juice is a great source of natural energy for developers ⚡️",
  "Juice is the perfect refreshment for long coding sessions 🥤",
  "Juice can help you stay motivated during tough coding challenges 💪",
]

function increment() {
  count.value++
  popAnim.value = true

  if (count.value % 1 === 0) {
    currentFact.value = juiceFacts[Math.floor(Math.random() * juiceFacts.length)]
    showFact.value = true
    setTimeout(() => {
      showFact.value = false
    }, 4000)
  }
}

function resetAnimation() {
  popAnim.value = false
}
</script>

<style scoped>
.counter-game {
  background-color: #f0faff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  margin: 1.5rem auto;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #005b99;
  box-shadow: 0 8px 16px rgba(0, 123, 255, 0.2);
}

h1 {
  margin-bottom: 1rem;
}

.click-count {
  font-size: 2rem;
  font-weight: bold;
  color: #007acc;
  display: inline-block;
  transition: transform 0.2s ease;
}

/* Pop animation on count change */
.pop {
  animation: popScale 0.3s ease forwards;
}

@keyframes popScale {
  0% { transform: scale(1); }
  50% { transform: scale(1.5); color: #ff6700; }
  100% { transform: scale(1); color: #007acc; }
}

.btn-counter {
  background-color: #007acc;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.btn-counter:hover {
  background-color: #005a9e;
}

.juice-fact {
  margin-top: 1.5rem;
  font-style: italic;
  font-size: 1.1rem;
  color: #00497a;
  font-weight: 600;
}

.tip {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #007acc;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dark .counter-game {
  background-color: #0a1a2f; /* Deep navy blue */
  color: #d0e8ff; /* Light text */
  box-shadow: 0 8px 16px rgba(0, 123, 255, 0.1);
}

.dark .click-count {
  color: #66c2ff;
}

.dark .btn-counter {
  background-color: #3399ff;
  color: #ffffff;
}

.dark .btn-counter:hover {
  background-color: #267acc;
}

.dark .juice-fact {
  color: #a5d8ff;
}

.dark .tip {
  color: #7ecbff;
}

.dark .pop {
  animation: darkPopScale 0.3s ease forwards;
}

@keyframes darkPopScale {
  0% { transform: scale(1); }
  50% { transform: scale(1.5); color: #ffa500; }
  100% { transform: scale(1); color: #66c2ff; }
}

</style>
