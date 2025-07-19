<template>
  <div class="chart-slide">
    <h3>{{ title }}</h3>
    <Chart :type="type" :data="data" :options="options" />
  </div>
</template>

<script setup>
import { Chart } from 'vue-chartjs'
import { Chart as ChartJS, registerables } from 'chart.js'
ChartJS.register(...registerables)

defineProps({
  title: String,
  type: String,
  data: Object,
  options: Object
})
</script>

<style scoped>
.chart-slide {
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
  text-align: center;
}

.chart-slide {
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  background: #ffffff; /* Light mode background */
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
  text-align: center;
  color: #000000; /* Light mode text */
}

/* Dark mode overrides */
.dark .chart-slide {
  background: #121212; /* Dark background */
  color: #ffffff;      /* White text */
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.5); /* Stronger glow on dark */
}
.dark .chart-slide h3 {
  color: #ffffff; /* White text for headings in dark mode */
}
</style>

