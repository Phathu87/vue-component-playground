<template>
  <header class="app-header">
    <div class="logo">
      🚀 <strong>Vue Playground</strong>
    </div>

    <!-- If logged in, show nav + logout -->
    <template v-if="loggedIn">
      <nav class="nav-buttons">
        <button 
          :class="{ active: activeView === 'HomeView' }"
          @click="$emit('change-view', 'HomeView')"
          aria-label="Switch to HomeView"
        >
          🏠 Home
        </button>

        <button 
          :class="{ active: activeView === 'WhatThisAppShows' }"
          @click="$emit('change-view', 'WhatThisAppShows')"
          aria-label="Switch to WhatThisAppShows"
        >
          💡 What Vue Solves
        </button>

        <button 
          :class="{ active: activeView === 'MiniGames' }"
          @click="$emit('change-view', 'MiniGames')"
          aria-label="Switch to MiniGames"
        >
          🎲 Mini Games
        </button>

        <!-- Dark Mode Toggle -->
        <button @click="toggleDarkMode">
         {{ isDarkMode ? '🌞 Light' : '🌙 Dark' }}
        </button>

        <div class="user-info">
          <img :src="avatarUrl" alt="User Avatar" class="avatar" />
          <span>{{ userName }}</span>
          <button class="logout-btn" @click="$emit('logout')">🚪 Logout</button>
        </div>
      </nav>
    </template>

    <!-- If not logged in, show login/signup form -->
    <template v-else>
      <form class="login-form" @submit.prevent="isSignup ? doSignup() : doLogin()">
        <input v-if="isSignup" v-model="signupName" type="text" placeholder="First Name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required minlength="4" />
        <button type="submit">{{ isSignup ? '📝 Sign up' : '🔐 Login' }}</button>
        <p class="signup-prompt">
          <template v-if="isSignup">
            Already have an account? <a href="#" @click.prevent="toggleAuthMode">Login</a>
          </template>
          <template v-else>
            Don't have an account? <a href="#" @click.prevent="toggleAuthMode">Sign up</a>
          </template>
        </p>
      </form>
    </template>
  </header>
</template>

<script setup>
defineOptions({ name: 'AppHeader' })
import { ref, onMounted,watch } from 'vue'
const emit = defineEmits('change-view', 'login', 'logout')
defineProps({ 
  activeView: String,
  loggedIn: Boolean,
})

const signupName = ref('')
const userName = ref('')
const email = ref('')
const password = ref('')
const userEmail = ref('')
const avatarUrl = ref('https://i.pravatar.cc/40') // static placeholder avatar(some pretty cool avatars)
const isSignup = ref(false)
const isDarkMode = ref(localStorage.getItem('theme') === 'dark')

onMounted(() => {
  const savedEmail = localStorage.getItem('userEmail')
  const savedName = localStorage.getItem('userName')
  if (savedEmail && savedName) {
    userEmail.value = savedEmail
    userName.value = savedName
    emit('login', { email: savedEmail })
  }
  applyTheme()
})

watch(isDarkMode, ()=> {
  applyTheme()
})

function applyTheme() {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
}

// Do logging in, check if user exists in our little localStorage club
function doLogin() {
  if (email.value && password.value.length >= 4) {
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(user => user.email === email.value)

    if (user) {
      localStorage.setItem('userEmail', email.value)
      localStorage.setItem('userName', user.name || email.value.split('@')[0])
      userEmail.value = email.value  // Use email prefix as name if not set
      userName.value = user.name || email.value.split('@')[0]
      emit('login', { email: email.value})
      email.value = ''
    } else {
      alert('User not found. Please sign up first.')
    }
  } else {
    alert('Please enter valid credentials (password must be at least 4 characters).')
  }   
}

// Do signup, check if user exists in our little localStorage club if they do kick them out for being slow...kidding redirect them to login
// Also, never store passwords in plain text in a real app!
function doSignup() {
  if (email.value && password.value.length >= 4 && signupName.value) {
    const users = JSON.parse(localStorage.getItem('users')) || []
    
    // Check if user already exists
    const userExists = users.some(user => user.email === email.value)
    if (userExists) {
      alert('This email is already registered. Please login instead.')
      return
    }
    
    // Add new user
    users.push({
      email: email.value,
      password: password.value, // Note: In a real app, I will never ever store plain passwords
      name: signupName.value,
    })
    
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('userEmail', email.value)
    localStorage.setItem('userName', signupName.value)
    userName.value = signupName.value
    userEmail.value = email.value
    emit('login', { email: email.value })
    email.value = ''
    password.value = ''
    signupName.value = ''
    isSignup.value = false
    alert('Account created successfully! You are now logged in.')
  } else {
    alert('Please enter valid credentials (password must be at least 4 characters).')
  }
}

function toggleAuthMode() {
  isSignup.value = !isSignup.value
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0532c7;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: #fff;
  flex-wrap: wrap;
}

.logo {
  font-size: 1.3rem;
  font-weight: 700;
}

.nav-buttons {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  align-items: center;
}

button,
.logout-btn {
  background: transparent;
  border: 2px solid #a3bbff;
  border-radius: 5px;
  color: #dbe1ff;
  font-weight: 600;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease;
  min-width: 100px;
}

button.active,
button:hover,
.logout-btn:hover {
  background-color: #a3bbff;
  color: #0532c7;
  border-color: #0532c7;
}

.login-form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.login-form input {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
}

.login-form input[name="name"] {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  width: 100%;
}

.login-form button {
  padding: 0.5rem 1rem;
  background: #a3bbff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  color: #0532c7;
  cursor: pointer;
}

.signup-prompt {
  width: 100%;
  color: #eee;
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

.signup-prompt a {
  color: #fff;
  font-weight: bold;
  text-decoration: underline;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
}

.avatar {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  border: 2px solid #fff;
}

@media (max-width: 600px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-buttons {
    width: 100%;
    justify-content: flex-start;
    margin-top: 0.75rem;
  }

  button {
    min-width: 70px;
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
  }

  .login-form {
    width: 100%;
    flex-direction: column;
  }

  .login-form input,
  .login-form button {
    width: 100%;
  }
}

/* 🔥 Dark mode overrides for .app-header and children */
.dark .app-header {
  background-color: #333;
  color: #ffffff;
}

.dark .logout-btn,
.dark button {
  background: transparent;
  border-color: #444;
  color: #ffffff;
}

.dark button.active,
.dark button:hover,
.dark .logout-btn:hover {
  background-color: #ffffff;
  color: #1e1e1e;
  border-color: #ffffff;
}

.dark .login-form input {
  background-color: #333;
  color: #fff;
  border: 1px solid #555;
}

.dark .login-form button {
  background-color: #ffffff;
  color: #1e1e1e;
}

.dark .signup-prompt {
  color: #aaa;
}

.dark .signup-prompt a {
  color: #ffffff;
}
.dark .user-info {
  color: #ffffff;
}
</style>