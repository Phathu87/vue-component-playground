<template>
  <div class="todo-app">
    <h1>📝 My Vue Todo List</h1>

    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add a new task..." />
      <button type="submit">➕ Add</button>
    </form>

    <ul>
      <li 
        v-for="(todo, index) in todos" 
        :key="index" 
        :class="{ done: todo.done }"
      >
        <span @click="toggleDone(index)">{{ todo.text }}</span>
        <button @click="removeTodo(index)">❌</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const newTodo = ref('')
const todos = ref([])

onMounted(() => {
  const saved = localStorage.getItem('todos')
  if (saved) todos.value = JSON.parse(saved)
})

watch(todos, (val) => {
  localStorage.setItem('todos', JSON.stringify(val))
}, { deep: true })

function addTodo() {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ text: newTodo.value, done: false })
    newTodo.value = ''
  }
}

function removeTodo(index) {
  todos.value.splice(index, 1)
}

function toggleDone(index) {
  todos.value[index].done = !todos.value[index].done
}
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
}

form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #0532c7;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0.75rem;
  border: 1px solid #eee;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  transition: 0.3s;
}

li.done span {
  text-decoration: line-through;
  color: gray;
}

/* Dark mode styles */
.dark h1 {
  color: #f1eeee; /* Manual dark mode override */
}

/* Dark mode styles for todo app */
.dark .todo-app {
  background: #1e1e1e;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.05);
}

.dark .todo-app input {
  background-color: #2c2c2c;
  color: #f1f1f1;
  border: 1px solid #444;
}

.dark .todo-app button {
  background-color: #1a4fff;
  color: white;
}

.dark .todo-app li {
  background-color: #2a2a2a;
  color: #f5f5f5;
  border-color: #444;
}

.dark .todo-app li.done span {
  color: #888;
}
.dark .todo-app li.done {
  background-color: #333;
}
</style>
