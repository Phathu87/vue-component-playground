<template>
  <div class="daily-vue-tip">
    <h2>💡 Daily Vue Tip</h2>

    <transition name="fade">
      <blockquote :key="tip.id">
        "{{ tip.message }}"
        <footer>— {{ tip.author }}</footer>
      </blockquote>
    </transition>

    <button @click="newTip">🔄 Get Another</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tips = [
  {
    id: 1,
    message: "Keep components small. If it feels like a monster, break it down.",
    author: "Vue Dev Proverb"
  },
  {
    id: 2,
    message: "Use v-model like it's your best friend. Two-way binding = ✨ magic.",
    author: "Vue Core Docs"
  },
  {
    id: 3,
    message: "Setup() is the new Options API flex. Embrace the Composition API!",
    author: "Some Cool Dev"
  },
  {
    id: 4,
    message: "If you're debugging with console.log... you're still a real developer.",
    author: "Someone Honest"
  },
  {
    id: 5,
    message: "Don't forget: v-if and v-show are different. Learn them well.",
    author: "Wise Vue Wizard"
  },
  {
    id: 6,
    message: "Juice-powered devs write better Vue code. Probably.",
    author: "Phathu"
  },
 {
    id: 7,
    message: "Props are like gifts. Don't forget to validate them!",
    author: "Vue Guru"
},
{
    id: 8,
    message: "Use computed properties to cache expensive calculations.",
    author: "Performance Pro"
},
  
  {
    id: 9,
    message: "Mixins are great, but use them wisely. Composition is the future!",
    author: "Vue Enthusiast"
  },
  {
    id: 10,
    message: "Keep your templates clean. Use components to break down complexity.",
    author: "Vue Best Practices"
  },
  {
    id: 11,
    message: "Use the v-for directive wisely. Keys are your friends!",
    author: "Vue Performance Guide"
  },

  {
    id: 12,
    message: "Vue Router is powerful. Use named routes for better navigation.",
    author: "Vue Router Docs"
  },
  {
    id: 13,
    message: "Use the Composition API for better logic reuse.",
    author: "Vue Composition Expert"
  },
  {
    id: 14,
    message: "Watch out for unnecessary re-renders by using 'key' on dynamic components.",
    author: "Vue"
  },
  {
    id: 15,
    message: "Use the provide/inject API for dependency injection in Vue.",
    author: "Vue Dependency Guru"
  },
  {
    id: 16,
    message:  "Slots let you create highly reusable and flexible components.",
    author: "Vue Slot Master"
  },    
  {
    id: 17,
    message: "Use Vue DevTools to debug your app visually.",
    author: "Vue Debugging Pro"
  },  
  {
    id: 18,
    message: "Leverage Vue's built-in directives for simpler templates.",
    author: "Phathu"
  },
  
]

const tip = ref(tips[Math.floor(Math.random() * tips.length)])

function newTip() {
  let next
  do {
    next = tips[Math.floor(Math.random() * tips.length)]
  } while (next.id === tip.value.id)
  tip.value = next
}
</script>

<style scoped>
.daily-vue-tip {
  background: #fff7e6;
  border: 2px dashed #ffc107;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 4px 10px rgba(255, 193, 7, 0.2);
  text-align: center;
  color: #704800;
}

blockquote {
  font-size: 1.1rem;
  font-style: italic;
  margin: 1rem auto;
  max-width: 500px;
}

footer {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #a36f00;
}

button {
  background: #ffc107;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

button:hover {
  background: #e0a800;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
