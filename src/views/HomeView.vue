<template>
  <section class="home-view">
    <h1>👋 Welcome to the Vue Playground</h1>

    <p class="tagline">
      Explore interactive Vue components, forms, filters, charts, and more —
      built for fun, powered by juice. 🍹
    </p>

    <div class="feature-grid">
      <div class="card">
        <h3>🧪 Dynamic Components</h3>
        <p>Switch between different user views and simulate real UI behavior.</p>
      </div>

      <div class="card">
        <h3>📋 Form Validation</h3>
        <p>Live-validated forms that simulate contact or signup flows.</p>
      </div>

      <div class="card">
        <h3>🔍 Team Explorer</h3>
        <p>Search & filter through user lists, ideal for dashboards or admin UIs.</p>
      </div>

      <div class="card">
        <h3>📊 Charts Dashboard</h3>
        <p>Beautiful data viz with Chart.js — see how Vue handles real-world stats.</p>
      </div>

      <div class="card">
        <h3>🧠 Daily Vue Tips</h3>
        <p>Fun Vue facts and dev tips delivered daily.</p>
      </div>

      <div class="card">
        <h3>⚡ Toggle Themes</h3>
        <p>Light/Dark mode support with persistent state.</p>
      </div>
    </div>

    <p class="footer-line">
      This is just the beginning. Stick around, play, and get inspired. 💡
    </p>
  </section>
</template>

<script setup>
// no logic needed
</script>

<style scoped>
.home-view {
  padding: 2rem 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  color: var(--text);
}

.tagline {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--text-muted);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: var(--card-bg);
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.card h3 {
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.footer-line {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-top: 2rem;
  font-style: italic;
}
h1 {
  margin-bottom: 1.5rem;
  color: #000000;
  font-weight: 700;
}

/* Dark mode styles */
.dark h1 {
  color: #020202; /* Manual dark mode override */
}

.tagline,
.footer-line {
  color: #020202 !important; /* Force black in both light and dark mode */
}

</style>

