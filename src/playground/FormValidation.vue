<template>
  <section class="contact-form">
    <h2>📬 Get in Touch</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="form.name" type="text" id="name" required placeholder="Your full name" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="form.email" type="email" id="email" required placeholder="your@email.com" />
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="form.message" id="message" rows="4" required placeholder="How can I help you?"></textarea>
      </div>

      <button type="submit">🚀 Send Message</button>

      <transition name="fade">
        <p v-if="statusMessage" :class="{ success: statusSuccess, error: !statusSuccess }">
          {{ statusMessage }}
        </p>
      </transition>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const statusMessage = ref('')
const statusSuccess = ref(false)

function handleSubmit() {
  if (!form.value.name || !form.value.email || !form.value.message) {
    statusMessage.value = '⚠️ Please fill out all fields.'
    statusSuccess.value = false
    return
  }

  // Simulate email sending delay
  statusMessage.value = '📨 Sending...'
  setTimeout(() => {
    statusMessage.value = `✅ Message sent! Thanks, ${form.value.name}.`
    statusSuccess.value = true
    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
  }, 1500)
}
</script>

<style scoped>
.contact-form {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2rem auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  margin-bottom: 1rem;
  color: #0532c7;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.4rem;
  font-weight: 600;
}

input,
textarea {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

button {
  background-color: #0532c7;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #002a9c;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.success {
  margin-top: 1rem;
  color: green;
}

.error {
  margin-top: 1rem;
  color: red;
}

.dark .contact-form {
  background-color: #1e1e1e;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
  color: #f0f0f0;
}

.dark h2 {
  color: #3d8bff; /* A softer blue for dark backgrounds */
}

.dark input,
.dark textarea {
  background-color: #2a2a2a;
  border: 1px solid #555;
  color: #fff;
}

.dark input::placeholder,
.dark textarea::placeholder {
  color: #aaa;
}

.dark label {
  color: #f0f0f0;
}

.dark .success {
  color: #66ff66;
}

.dark .error {
  color: #ff4c4c;
}
.dark button {
  background-color: #3d8bff;
}
</style>
