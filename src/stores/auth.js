import { ref, reactive, computed } from 'vue'

const isLoggedIn = ref(false)
const user = ref({ name: '' })
const users = ref([])

function register(name, email, password) {
  if (users.value.find(u => u.email === email)) {
    alert('User already exists!')
    return false
  }
  users.value.push({ name, email, password })
  alert('Registered successfully!')
  return true
}

function login(email, password) {
  const match = users.value.find(u => u.email === email && u.password === password)
  if (!match) {
    alert('Invalid credentials.')
    return false
  }
  isLoggedIn.value = true
  user.value = { ...match }
  return true
}

function logout() {
  isLoggedIn.value = false
  user.value = { name: '' }
}

export function useAuth() {
  return {
    isLoggedIn,
    user,
    register,
    login,
    logout,
  }
}
