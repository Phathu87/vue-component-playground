<template>
  <div class="chart-block">
    <h3>{{ title }}</h3>
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

defineProps({
  title: String,
  chartData: Object,
})

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}
</script>

<style scoped>
.chart-block {
  background: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(100, 100, 255, 0.1);
  width: 320px;
}

h3 {
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #222;
}

.chart-block {
  background: #ffffff; /* Light mode */
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(100, 100, 255, 0.1);
  width: 320px;
}

h3 {
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #222; /* Light mode */
}

/* Dark mode overrides */
.dark .chart-block {
  background: #1e1e1e; /* Dark background - you can tweak this */
  box-shadow: 0 2px 8px rgba(50, 50, 150, 0.5); /* Optional: softer shadow for dark */
}

.dark h3 {
  color: #f0f0f0; /* Light text for dark mode */
}
</style>

