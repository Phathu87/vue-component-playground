<template>
  <section class="vue-showcase-info">
    <h2>💡 What This App Shows</h2>
     <p class="intro">
      Welcome to a juice-powered Vue.js playground! Here’s what you’ll experience:
    </p>

     <div class="feature-grid">
      <div class="feature-card" v-for="feature in features" :key="feature.title">
        <div class="emoji">{{ feature.emoji }}</div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>

    <p class="note">
      Everything here is powered by <strong>Vue 3</strong>, <strong>Composition API</strong>,
      and a healthy dose of 🍹juice. Want this in your next project? <strong>Let’s chat!</strong> 🚀
    </p>
  </section>
</template>

<script setup>
const features = [
  {
    emoji: '🎭',
    title: 'Dynamic Components',
    description: 'Swap between components like Profile, Settings, and Posts in real-time using <component :is="">.',
  },
  {
    emoji: '✅',
    title: 'Form Validation',
    description: 'Custom-built form validation simulating sign-ups and contact submissions with UX in mind.',
  },
  {
    emoji: '🔍',
    title: 'Filtering & Searching',
    description: 'See Vue’s reactivity at work with real-time filtering, sorting, and mapping of dummy data.',
  },
  {
    emoji: '📊',
    title: 'Interactive Charts',
    description: 'Visualize data using Chart.js/ApexCharts with animated transitions and dynamic datasets.',
  },
  {
    emoji: '⚙️',
    title: 'Settings Simulation',
    description: 'A mock settings panel with dark/light mode, toggle switches, and saved preferences.',
  },
  {
    emoji: '🧠',
    title: 'Daily Tips',
    description: 'Smart, reusable components that rotate Vue.js dev tips, powered by random logic or APIs.',
  },
  {
    emoji: '🎨',
    title: 'Dark Mode',
    description: 'Full app-wide dark mode toggle using CSS variables and dynamic Vue bindings.',
  },
  {
    emoji: '🧃',
    title: 'Humor + Developer Flavor',
    description: 'This isn’t your boring demo. Expect jokes, juice, and some sass in the UI too.',
  },
]
</script>

<style scoped>
.vue-showcase-info {
  background-color: #fdfdfd;
  border-left: 6px solid #0532c7;
  padding: 1.5rem;
  margin: 2rem auto;
  border-radius: 10px;
  max-width: 900px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  font-size: 1rem;
  line-height: 1.6;
}

.intro,
.closing {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #444;
}

.feature-grid {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.feature-card {
  background: #eaf2ff;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 85, 255, 0.06);
}

.feature-card:hover {
  transform: scale(1.04);
}

.emoji {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.vue-showcase-info h2 {
  margin-bottom: 1rem;
  color: #0532c7;
}

.vue-showcase-info ul {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
}

.vue-showcase-info li {
  margin-bottom: 0.5rem;
}

.note {
  font-style: italic;
  color: #333;
}

/* Dark mode overrides */
.dark .vue-showcase-info {
  background-color: #1f1f1f;
  border-left-color: #4d80ff;
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.05);
}

.dark .intro,
.dark .closing {
  color: #dddddd;
}

.dark .feature-card {
  background: #2a2a2a;
  box-shadow: 0 4px 12px rgba(100, 100, 100, 0.08);
}

.dark .vue-showcase-info h2 {
  color: #7ca9ff;
}

.dark .note {
  color: #cccccc;
}
.dark .emoji {
  color: #ffcc00; /* Bright color for emojis in dark mode */
}
</style>
