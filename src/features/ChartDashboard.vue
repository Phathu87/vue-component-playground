<template>
  <div class="chart-dashboard">
    <h1 class="dashboard-title">📊 Vue Chart Carousel</h1>

    <div class="chart-toggle">
      <button 
        v-for="(chart, index) in charts" 
        :key="chart.title"
        :class="{ active: currentIndex === index }"
        @click="currentIndex = index"
      >
        {{ chart.emoji }} {{ chart.title }}
      </button>
    </div>

    <transition name="fade" mode="out-in">
      <ChartSlide
        :key="charts[currentIndex].title"
        :title="charts[currentIndex].title"
        :type="charts[currentIndex].type"
        :data="charts[currentIndex].data"
        :options="chartOptions"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChartSlide from '@/components/ChartSlide.vue'
import { Chart as ChartJS, registerables } from 'chart.js'
import 'chart.js/auto'
ChartJS.register(...registerables)

const currentIndex = ref(0)

const charts = [
  {
    title: 'Juice vs Coffee',
    emoji: '🥤',
    type: 'doughnut',
    data: {
      labels: ['Juice', 'Coffee'],
      datasets: [{
        label: 'Cups This Week',
        data: [12, 3],
        backgroundColor: ['#f59e0b', '#6b7280']
      }]
    }
  },
  {
    title: 'Projects Per Month',
    emoji: '📅',
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Projects Done',
        data: [2, 4, 3, 5, 6, 7],
        backgroundColor: '#0532c7'
      }]
    }
  },
  {
    title: 'Framework Popularity',
    emoji: '🔥',
    type: 'doughnut',
    data: {
      labels: ['Vue', 'React', 'Angular', 'Svelte'],
      datasets: [{
        label: 'Awesomeness Level',
        data: [100, 85, 70, 60],
        backgroundColor: ['#42b983', '#61dafb', '#dd1b16', '#ff3e00']
      }]
    }
  }
]

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    }
  }
}
</script>

<style scoped>
.chart-dashboard {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background: #f7faff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 85, 255, 0.1);
  text-align: center;
  color: #0532c7;
}

.dashboard-title {
  margin-bottom: 1.5rem;
}

.chart-toggle {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.chart-toggle button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: #e0eaff;
  color: #0532c7;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.25s;
}

.chart-toggle button.active,
.chart-toggle button:hover {
  background-color: #0532c7;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dark .chart-dashboard {
  background: #121b2f; /* Dark blue-ish background */
  box-shadow: 0 4px 12px rgba(0, 85, 255, 0.3); /* Slightly stronger blue glow */
  color: #a8c1ff; /* Light blue text */
}

.dark .chart-toggle button {
  background-color: #2a3b67; /* Darker button bg */
  color: #a8c1ff;           /* Light blue text */
}

.dark .chart-toggle button.active,
.dark .chart-toggle button:hover {
  background-color: #4d73ff; /* Bright blue highlight */
  color: #fff;               /* White text on active/hover */
}
.dark .dashboard-title {
  color: #ffffff; /* White title in dark mode */
}
</style>
