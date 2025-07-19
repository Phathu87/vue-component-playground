<template>
  <div class="mini-games">
    <h1>🎮 Mini Games Playground</h1>
    <p>Have fun! Play games, beat your best scores, and try again!</p>

    <!-- Click Race -->
    <div class="game-card">
      <h2>🏃‍♂️ Click Race (10 seconds)</h2>
      <p>Click as many times as you can in 10 seconds!</p>

      <button v-if="!running" @click="startRace" class="start-btn">Start Game</button>
      <button v-else @click="incrementCount" class="click-btn">Click me!</button>

      <p>Clicks: <strong>{{ count }}</strong></p>
      <p v-if="!running && count > 0">⏰ Time's up! Score: <strong>{{ count }}</strong></p>
      <p v-if="bestClickRace">🏆 Best: {{ bestClickRace }} clicks</p>

      <button v-if="!running && count > 0" @click="startClickRace" class="play-again-btn">Play Again</button>
    </div>

    <!-- Reaction Time -->
    <div class="game-card">
      <h2>⚡ Reaction Time</h2>
      <p>Wait for the box to turn green, then click fast!</p>

      <div :class="['reaction-box', reactionState]" @click="boxClicked">
        <span v-if="reactionState === 'waiting'">Wait for green...</span>
        <span v-else-if="reactionState === 'ready'">Click now!</span>
        <span v-else-if="reactionState === 'tooSoon'">Too soon! Wait...</span>
        <span v-else-if="reactionState === 'done'">⏱️ {{ reactionTime }} ms</span>
      </div>

      <p v-if="bestReactionTime !== null">🏆 Best: {{ bestReactionTime }} ms</p>
      <button @click="startReactionTest" class="play-again-btn">Try Again</button>
    </div>

    <!-- Guess the Number -->
    <div class="game-card">
      <h2>🎲 Guess the Number</h2>
      <p>Guess a number between 1 and 100.</p>

      <input type="number" v-model.number="guess" :disabled="won" min="1" max="100" placeholder="Your guess" />
      <button @click="checkGuess" :disabled="won || guess === null">Guess</button>

      <p>{{ message }}</p>
      <p v-if="won">🎉 You won in {{ guessAttempts }} attempts!</p>
      <p v-if="bestGuesses !== null">🏆 Best: {{ bestGuesses }} attempts</p>

      <button @click="resetGuess" class="play-again-btn">Start New Game</button>
    </div>

    <button class="reset-btn" @click="resetBestScores">🔄 Reset All Best Scores</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

// Dark mode support
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
})
const toggleDark = useToggle(isDark)
toggleDark

// Click Race Game
const count = ref(0)
const running = ref(false)
let timer = null

function startRace() {
  count.value = 0
  running.value = true
  timer = setTimeout(() => {
    running.value = false
  }, 10000) // 10 seconds
}

// Optional: clear timer on unmount to avoid memory leaks
import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

const bestClickRace = ref(parseInt(localStorage.getItem('bestClickRace')) || 0)

function startClickRace() {
  count.value = 0
  running.value = true
  timer = setTimeout(() => {
    running.value = false
    if (count.value > bestClickRace.value) {
      bestClickRace.value = count.value
      localStorage.setItem('bestClickRace', count.value)
    }
  }, 10000)
}
function incrementCount() {
  if (running.value) count.value++
}

// Reaction Time Game
const reactionState = ref('waiting') // waiting, ready, tooSoon, done
const reactionTime = ref(null)
const bestReactionTime = ref(
  localStorage.getItem('bestReactionTime') !== null
    ? parseInt(localStorage.getItem('bestReactionTime'))
    : null
)
let startTime = null
let timeoutId = null

function startReactionTest() {
  reactionState.value = 'waiting'
  reactionTime.value = null

  if (timeoutId) clearTimeout(timeoutId)

  // Random delay 1-3 seconds before green
  const delay = Math.random() * 2000 + 1000

  timeoutId = setTimeout(() => {
    reactionState.value = 'ready'
    startTime = performance.now()
  }, delay)
}

function boxClicked() {
  if (reactionState.value === 'waiting') {
    reactionState.value = 'tooSoon'
    if (timeoutId) clearTimeout(timeoutId)
  } else if (reactionState.value === 'ready') {
    const endTime = performance.now()
    reactionTime.value = Math.round(endTime - startTime)
    reactionState.value = 'done'

    if (
      bestReactionTime.value === null ||
      reactionTime.value < bestReactionTime.value
    ) {
      bestReactionTime.value = reactionTime.value
      localStorage.setItem('bestReactionTime', reactionTime.value)
    }
  }
}

// Guess the Number Game
const secretNumber = ref(Math.floor(Math.random() * 100) + 1)
const guess = ref(null)
const message = ref('')
const won = ref(false)
const guessAttempts = ref(0)
const bestGuesses = ref(
  localStorage.getItem('bestGuesses') !== null
    ? parseInt(localStorage.getItem('bestGuesses'))
    : null
)

function checkGuess() {
  if (guess.value === null) return
  guessAttempts.value++
  if (guess.value === secretNumber.value) {
    message.value = `🎉 Correct! You guessed it in ${guessAttempts.value} attempts!`
    won.value = true

    if (!bestGuesses.value || guessAttempts.value < bestGuesses.value) {
      bestGuesses.value = guessAttempts.value
      localStorage.setItem('bestGuesses', guessAttempts.value)
    }
  } else if (guess.value > secretNumber.value) {
    message.value = '⬇️ Too high! Try lower.'
  } else if (guess.value < secretNumber.value) {
    message.value = '⬆️ Too low! Try higher.'
  }
}

function resetGuess() {
  secretNumber.value = Math.floor(Math.random() * 100) + 1
  guess.value = null
  message.value = ''
  won.value = false
  guessAttempts.value = 0
}

// Reset all best scores
function resetBestScores() {
  bestClickRace.value = 0
  bestReactionTime.value = null
  bestGuesses.value = null
  localStorage.removeItem('bestClickRace')
  localStorage.removeItem('bestReactionTime')
  localStorage.removeItem('bestGuesses')
}

</script>

<style scoped>
.mini-games {
  max-width: 650px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
  color: #0532c7;
  background: #eeeaea;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 85, 255, 0.15);
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 0.5rem;
  color: #00497a;
}

p {
  margin: 0.3rem 0 1rem;
}

section.game {
  margin-bottom: 2rem;
}

.click-btn {
  font-size: 1.4rem;
  padding: 0.7rem 1.5rem;
  background-color: #f59e0b;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.click-btn:disabled {
  background-color: #c7a256;
  cursor: not-allowed;
}

.play-again-btn {
  margin-top: 0.8rem;
  padding: 0.4rem 1rem;
  background-color: #0532c7;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.play-again-btn:hover {
  background-color: #0351a8;
}

.reaction-box {
  margin: 1rem auto;
  width: 200px;
  height: 120px;
  border-radius: 12px;
  user-select: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: white;
  font-size: 1.3rem;
  box-shadow: 0 4px 10px rgba(0, 85, 255, 0.3);
}
.reaction-box.waiting {
  background-color: #7a7a7a;
  cursor: not-allowed;
}
.reaction-box.ready {
  background-color: #4caf50;
}
.reaction-box.tooSoon {
  background-color: #f44336;
}
.reaction-box.done {
  background-color: #2196f3;
}

input[type='number'] {
  padding: 0.4rem 0.7rem;
  font-size: 1rem;
  border: 1px solid #aaa;
  border-radius: 5px;
  width: 110px;
  margin-right: 10px;
}

button {
  outline: none;
}

.reset-btn {
  display: block;
  margin: 0 auto 1rem;
  padding: 0.6rem 1.4rem;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease;
}
.reset-btn:hover {
  background-color: #c9302c;
}

.game-card {
  background-color: #ffffff;
  border: 2px solid #e0eaff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 85, 255, 0.08);
  transition: transform 0.2s ease;
}

.game-card:hover {
  transform: scale(1.01);
}

.game-card h2 {
  margin-top: 0;
  color: #0532c7;
}

.game-card p {
  margin-bottom: 0.6rem;
}

.reaction-box.waiting {
  background-color: #7a7a7a;
  color: #fff;
  cursor: not-allowed;
}
.reaction-box.ready {
  background-color: #4caf50;
  color: #fff;
}
.reaction-box.tooSoon {
  background-color: #f44336;
  color: #fff;
}
.reaction-box.done {
  background-color: #2196f3;
  color: #fff;
}

.dark .mini-games {
  background: #1e1e1e;
  color: #ffffff;
  box-shadow: 0 6px 15px rgba(0, 85, 255, 0.1);
}

.dark .mini-games h1,
.dark .mini-games h2,
.dark .mini-games p {
  color: #ffffff;
}

.dark .game-card {
  background-color: #2a2a2a;
  border-color: #333a55;
  color: #ffffff;
}

.dark .game-card h2 {
  color: #4f8cff;
}

.dark .play-again-btn {
  background-color: #1e3a8a;
}

.dark .play-again-btn:hover {
  background-color: #2563eb;
}

.dark .click-btn {
  background-color: #eab308;
}

.dark .click-btn:disabled {
  background-color: #a16207;
}

.dark .reset-btn {
  background-color: #b91c1c;
}

.dark .reset-btn:hover {
  background-color: #991b1b;
}

.dark input[type='number'] {
  background-color: #333;
  color: #fff;
  border-color: #555;
}
.dark .reaction-box {
  box-shadow: 0 4px 10px rgba(0, 85, 255, 0.2);
}

</style>
