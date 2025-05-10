<template>
  <div class="posts-area">
    <h3>📝 My Recent Posts</h3>
    <ul>
      <li v-for="(post, index) in dummyPosts" :key="index">
        {{ post }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const dummyPosts = [
  'Vue is dope, just sayin.',
  'Juice > coffee. Fight me.',
  'Random thoughts go here.',
]
</script>

<style scoped>
.posts-area {
  background: #fffbea;
  padding: 1rem;
  border: 1px solid #e2d08d;
  border-radius: 6px;
}
</style>

