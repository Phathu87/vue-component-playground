<template>
  <div class="profile-card">
    <h2>👤 User Profile</h2>

    <div class="toggle-mode">
      <label>
        <input type="checkbox" v-model="isPro" />
        Show Professional Profile
      </label>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="isPro" class="profile-content">
        <!-- Fun Profile -->
        <div v-if="!isPro" class="fun-profile">
          <img class="avatar" :src="avatarUrl" alt="Profile picture" />
          <h3>{{ userName }}</h3>
          <p class="bio">{{ bio }}</p>
          <p class="fav-tech">
            Favorite tech: <strong>{{ favoriteTech }}</strong> <br />
            Beverage of choice: <em>{{ beverage }}</em> 🧃 vs ☕ debate ongoing!
          </p>
          <button class="hire-me-btn" @click="contactMe">
            🚀 Hire Me!
          </button>
        </div>

        <!-- Professional Profile -->
        <div v-else class="pro-profile">
          <h3>{{ userName }}</h3>
          <p class="title">Front-End Developer & WordPress Specialist</p>
          <p class="email">📧 <a :href="`mailto:${email}`">{{ email }}</a></p>

          <div class="skills">
            <h4>Key Skills</h4>
            <ul>
              <li v-for="skill in skills" :key="skill">{{ skill }}</li>
            </ul>
          </div>

          <button class="download-cv-btn" @click="downloadCV">
            📄 Download CV
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userName = ref('Phathutshedzo Rakhunwana')
const email = ref('phathurakhunwana@gmail.com')
const avatarUrl = ref('https://media.licdn.com/dms/image/v2/D4D03AQHCTLi8jgEhZg/profile-displayphoto-shrink_400_400/B4DZRvDPNNG4Ak-/0/1737029907928?e=1758153600&v=beta&t=W7jkqUfVLFDR1ms_cGLW_iw4w65d8lD7lUUUXH1Ybuc') // nice sized avatar
const bio = ref('Front-end Wiz. WordPress maestro. Juice over Java ☕❌.')
const favoriteTech = ref('Vue.js, React & WordPress')
const beverage = ref('Juice 🧃')

const skills = ref([
  'Vue 3 & Composition API',
  'JavaScript / ES6+, TypeScript, React & Angular',
  'HTML & CSS (Tailwind, Bootstrap)',
  'WordPress Theme & Plugin Dev',
  'Responsive & Accessible UI',
  'API Integration & REST',
  'Git & Version Control',
])

const isPro = ref(false)

function contactMe() {
  window.location.href = `mailto:${email.value}?subject=Interested%20in%20Hiring%20You`
}

function downloadCV() {
  // Assume you have a CV link in your public folder or URL
  const cvUrl = 'Rakhunwana_Phathutshedzo_Given_CV_Updated.docx'
  window.open(cvUrl, '_blank')
}
</script>

<style scoped>
.profile-card {
  max-width: 480px;
  margin: 0 auto;
  background-color: #d0f0fd;
  border-radius: 12px;
  padding: 1.5rem;
  color: #00497a;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
  color: #003f6f;
}

.toggle-mode {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #007acc;
}

.toggle-mode input[type="checkbox"] {
  margin-right: 0.5rem;
  cursor: pointer;
}

.profile-content {
  text-align: center;
}

.avatar {
  border-radius: 50%;
  border: 3px solid #007acc;
  height: 100px;
  width: 100px;
  margin-bottom: 0.8rem;
}

.bio {
  font-style: italic;
  margin-bottom: 0.8rem;
}

.fav-tech {
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: #00497a;
}

.hire-me-btn, .download-cv-btn {
  padding: 0.6rem 1.5rem;
  background-color: #007acc;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease;
  user-select: none;
}

.hire-me-btn:hover, .download-cv-btn:hover {
  background-color: #005a9e;
}

.pro-profile .title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #003f6f;
}

.pro-profile .email a {
  color: #007acc;
  text-decoration: none;
}

.pro-profile .email a:hover {
  text-decoration: underline;
}

.skills {
  margin: 1rem 0;
  text-align: left;
}

.skills h4 {
  margin-bottom: 0.5rem;
  color: #00497a;
}

.skills ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  color: #003f6f;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}/* 🌙 Dark Mode Overrides */
.dark .profile-card {
  background-color: #1e1e1e;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark .profile-card h2,
.dark .pro-profile .title,
.dark .skills h4,
.dark .skills ul,
.dark .fav-tech {
  color: #ffffff;
}

.dark .toggle-mode {
  color: #bbbbbb;
}

.dark .pro-profile .email a {
  color: #4ab3f4;
}

.dark .hire-me-btn,
.dark .download-cv-btn {
  background-color: #2196f3;
  color: #ffffff;
}

.dark .hire-me-btn:hover,
.dark .download-cv-btn:hover {
  background-color: #1769aa;
}

.dark .avatar {
  border-color: #4ab3f4;
}
.dark .bio {
  color: #bbbbbb;
}


</style>

