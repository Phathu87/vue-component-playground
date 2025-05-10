<template>
  <form @submit.prevent="handleSubmit" class="form-box">
    <div class="field">
      <label for="userName">Name</label>
      <input id="userName" v-model.trim="userName" type="text" placeholder="Your awesome name" />
      <small v-if="!userName" class="error-msg">Oops! Name is missing.</small>
    </div>

    <div class="field">
      <label for="userEmail">Email</label>
      <input id="userEmail" v-model.trim="userEmail" type="email" placeholder="name@example.com" />
      <small v-if="userEmail && !isEmailCool" class="error-msg">Hmm, that email looks odd.</small>
    </div>

    <div class="field">
      <label for="userPass">Password</label>
      <input id="userPass" v-model="userPassword" type="password" placeholder="Make it strong" />
      <small v-if="userPassword && userPassword.length < 6" class="error-msg">
        At least 6 characters, champ.
      </small>
    </div>

    <button type="submit">Let’s Go 🚀</button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'

// fields
const userName = ref('')
const userEmail = ref('')
const userPassword = ref('')

// quick check if email is in a valid-ish format
const isEmailCool = computed(() => {
  const checker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return checker.test(userEmail.value)
})

// on submit, make sure we aren’t missing anything obvious
const handleSubmit = () => {
  if (!userName.value || !isEmailCool.value || userPassword.value.length < 6) {
    alert("Something ain't right... double check your inputs 😅")
    return
  }

  alert('Boom! Form submitted successfully 🎉')
}
</script>

<style scoped>
.form-box {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.field {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  margin-top: 0.2rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.error-msg {
  color: red;
  font-size: 0.875rem;
}
</style>