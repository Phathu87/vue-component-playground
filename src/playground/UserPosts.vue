<template>
  <div class="user-posts">
    <h2>📝 My Recent Post</h2>

    <form class="post-form" @submit.prevent="addPost">
      <input
        v-model="newPost.title"
        type="text"
        placeholder="Post Title"
        required
      />
      <textarea
        v-model="newPost.content"
        placeholder="Write something juicy..."
        required
      ></textarea>
      <button type="submit">➕ Add Post</button>
    </form>

    <transition-group name="fade" tag="div" class="post-list">
      <div v-for="(post, index) in posts" :key="post.id" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <p class="post-meta">
          🗓️ {{ formatDate(post.date) }} |
          ✍️ {{ post.author }}
        </p>
        <button @click="deletePost(index)">🗑️ Delete</button>
      </div>
    </transition-group>

    <p v-if="posts.length === 0" class="no-posts">No posts yet. Be the first to juice up this feed 🍹</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const newPost = ref({
  title: '',
  content: '',
  author: 'Phathu',
  date: new Date().toISOString(),
})

onMounted(() => {
  const saved = localStorage.getItem('userPosts')
  if (saved) {
    posts.value = JSON.parse(saved)
  }
})

function addPost() {
  if (newPost.value.title && newPost.value.content) {
    const postToAdd = {
      ...newPost.value,
      id: Date.now(),
      date: new Date().toISOString(),
    }
    posts.value.unshift(postToAdd)
    localStorage.setItem('userPosts', JSON.stringify(posts.value))
    newPost.value.title = ''
    newPost.value.content = ''
  }
}

function deletePost(index) {
  posts.value.splice(index, 1)
  localStorage.setItem('userPosts', JSON.stringify(posts.value))
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}
</script>

<style scoped>
.user-posts {
  max-width: 700px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #f3fbff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.1);
  color: #003f6f;
}

h2 {
  margin-bottom: 1rem;
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.post-form input,
.post-form textarea {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.95rem;
}

.post-form button {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background-color: #007acc;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.post {
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
}

.post-meta {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
}

.post button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  color: #ff4d4f;
  cursor: pointer;
}

.no-posts {
  text-align: center;
  font-style: italic;
  margin-top: 2rem;
  color: #888;
}

/* transition animations */
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.dark .user-posts {
  background: #0d1117; /* Very dark blue/black background */
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3); /* Slightly brighter shadow */
  color: #58a6ff; /* Light blue text for contrast */
}

.dark .user-posts h2 {
  color: #c9d1d9; /* Light grayish for headings */
}

.dark .post-form input,
.dark .post-form textarea {
  background-color: #161b22; /* Dark input background */
  border: 1px solid #30363d; /* Dark border */
  color: #c9d1d9; /* Light text */
}

.dark .post-form button {
  background-color: #238636; /* A green button for dark mode */
  color: #ffffff;
}

.dark .post-list .post {
  background: #161b22; /* Darker card background */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  color: #c9d1d9;
}

.dark .post-meta {
  color: #8b949e; /* Gray text for metadata */
}

.dark .post button {
  color: #ff7b72; /* Softer red for delete button */
}

.dark .no-posts {
  color: #8b949e; /* Gray italic text */
}
.dark .fade-enter-from,
.dark .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>


