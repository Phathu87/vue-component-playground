<template>
  <div class="filter-box">
    <input
      type="text"
      v-model="whoYouLookingFor"
      placeholder="🔍 Who you looking for?"
      class="search-input"
    />

    <ul v-if="filteredHomies.length">
      <li v-for="homie in filteredHomies" :key="homie.name">
        {{ homie.name }} — {{ homie.age }} y/o
      </li>
    </ul>

    <p v-else class="no-match">No one by that name 🤷‍♂️</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// the raw list of names and ages — your squad
const homies = ref([
  { name: 'Lesego', age: 25 },
  { name: 'Jonathan', age: 30 },
  { name: 'Phathu', age: 28 },
  { name: 'Je-Me', age: 22 },
  { name: 'Scott', age: 27 },
  { name: 'Botie', age: 29 },
  { name: 'Mariska', age: 24 },
])

// user search input
const whoYouLookingFor = ref('')

// compute filtered list based on what user types
const filteredHomies = computed(() => {
  const keyword = whoYouLookingFor.value.toLowerCase()
  return keyword
    ? homies.value.filter(homie =>
        homie.name.toLowerCase().includes(keyword)
      )
    : homies.value
})
</script>

<style scoped>
.filter-box {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}

.search-input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}

.no-match {
  color: #999;
  font-style: italic;
}
</style>
