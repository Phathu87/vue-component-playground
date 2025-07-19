<template>
  <transition name="fade">
    <div v-if="show" class="modal-backdrop">
      <div class="modal-card" @click.self="closeModal">
        <h2>👋 Welcome to the Vue Playground!</h2>
        <p>
          Explore components, test charts, play with forms, and see what Vue can do
          — powered by juice & good vibes. 🍹
        </p>
        <ul class="features-list">
          <li>🧪 Try out dynamic components</li>
          <li>📊 View data in charts</li>
          <li>📋 Contact me via a real-time validated form</li>
          <li>👨‍💻 Filter through users or explore posts</li>
          <li>🧠 Daily Vue Tips</li>
          <li>😎 ...and personality, of course!</li>
        </ul>

        <p class="juice-line">This playground is a work in progress, so expect more features and fun stuff
          to come soon! 🚀.Fueled by Vue. Powered by Juice. 🍹</p>

        <p class="open-count">🧠 You've opened this modal {{ openCount }} times</p>  

        <button @click="closeModal">Let’s Go 🚀</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { defineProps, defineEmits, watch } from 'vue'
import confetti from 'canvas-confetti'

const visible = ref(false)
const openCount = ref(1)
const progress = ref(100)
const autoCloseDuration =10 * 1000 // 10 seconds in ms

// Detect dark mode (basic approach, adapt as needed)
const isDarkMode = computed(() => window.matchMedia('(prefers-color-scheme: dark)').matches)

// Play sound helper
function playSound() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioCtx.createOscillator()
  oscillator.type = 'triangle'
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime) // A4 note
  oscillator.connect(audioCtx.destination)
  oscillator.start()
  oscillator.stop(audioCtx.currentTime + 0.15) // 150ms beep
}

onMounted(() => {
  visible.value = true

    // Confetti colors depending on dark/light mode
  const confettiColors = isDarkMode.value
    ? ['#ffffff', '#00ffea', '#0ff', '#aaffff']
    : ['#f59e0b', '#0532c7', '#42b983', '#ff3e00']

  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 },
    colors: confettiColors,
  })
  playSound()

  // Get and increment open count
  const count = parseInt(localStorage.getItem('welcomeOpenCount') || '0', 10)
  openCount.value = count + 1
  localStorage.setItem('welcomeOpenCount', openCount.value.toString())

  // Animate progress bar countdown
  const intervalTime = 50
  const totalSteps = autoCloseDuration / intervalTime
  let step = 0

  const interval = setInterval(() => {
    step++
    progress.value = 100 - (step / totalSteps) * 100
    if (step >= totalSteps) {
      clearInterval(interval)
      visible.value = false
    }
  }, intervalTime)
})

  // Auto close after 10 seconds
  setTimeout(() => {
    visible.value = false
  }, 10000)


function closeModal() {
  visible.value = false
}

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])
const showWelcome = ref(props.show)

onMounted(() => {
  const seen = localStorage.getItem('seenWelcome')
  if (!seen) {
    visible.value = true
    localStorage.setItem('seenWelcome', 'true')
    showWelcome.value = true
  }
})

watch(() => props.show, (newVal) => {
  showWelcome.value = newVal
  if (newVal) {
    visible.value = true
  } else {
    visible.value = false
  }
})

watch(visible, (newVal) => {
  if (!newVal) {
    emit('close')
    localStorage.setItem('welcomeDismissed', 'true')
  }
})

computed(() => {
  return {
    show: visible.value,
    openCount: openCount.value,
    progress: progress.value,
  }
})

</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-card {
  background: #fff;
  color: #0532c7;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 85, 255, 0.2);
  animation: popIn 0.4s ease;
}

.modal-card h2 {
  margin-bottom: 0.5rem;
}

.modal-card p {
  margin-bottom: 1rem;
}

.features-list {
  text-align: left;
  margin: 0 auto 1rem;
  max-width: 350px;
  padding-left: 1rem;
  color: #222;
}

.features-list li {
  margin-bottom: 0.5rem;
}

.juice-line {
  font-style: italic;
  color: #f59e0b;
  font-weight: bold;
}

.modal-card button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #0532c7;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.open-count {
  font-size: 0.85rem;
  margin-top: 0.5rem;
  color: #555;
}

.progress-bar-wrapper {
  width: 100%;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 1rem;
}

.progress-bar {
  height: 100%;
  background: #f59e0b;
  width: 100%;
  transition: width 0.05s linear;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
