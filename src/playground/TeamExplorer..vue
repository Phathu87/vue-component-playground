<template>
  <div class="team-explorer">
    <h1>👥 Team Explorer</h1>
    <p class="intro">Explore team members by name, skill, or location.</p>

    <!-- Filters -->
    <div class="filters">
      <input v-model="search" type="text" placeholder="🔍 Search by name or skill..." />

      <select v-model="selectedLocation">
        <option value="">🌍 All Locations</option>
        <option v-for="loc in uniqueLocations" :key="loc" :value="loc">
          📍 {{ loc }}
        </option>
      </select>

      <select v-model="selectedRole">
        <option value="">🎯 All Roles</option>
        <option v-for="role in uniqueRoles" :key="role" :value="role">
          🧩 {{ role }}
        </option>
      </select>
    </div>

    <!-- Team Grid -->
    <transition-group name="fade" tag="div" class="team-grid">
      <div v-for="member in filteredTeam" :key="member.id" class="team-card">
        <img :src="member.avatar" :alt="member.name" class="avatar" />
        <h3>{{ member.name }}</h3>
        <p class="role">{{ member.role }}</p>
        <p class="location">📍 {{ member.location }}</p>
        <div class="skills">
          <span v-for="skill in member.skills" :key="skill" class="skill">#{{ skill }}</span>
        </div>
      </div>
    </transition-group>

    <p v-if="filteredTeam.length === 0" class="no-results">
      😕 No team members match your criteria.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selectedLocation = ref('')
const selectedRole = ref('')

const team = ref([
  {
    id: 1,
    name: 'Phathu Rakhunwana',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQHCTLi8jgEhZg/profile-displayphoto-shrink_400_400/B4DZRvDPNNG4Ak-/0/1737029907928?e=1758153600&v=beta&t=W7jkqUfVLFDR1ms_cGLW_iw4w65d8lD7lUUUXH1Ybuc',
    role: 'Frontend Dev',
    skills: ['Vue', 'Tailwind', 'JavaScript','React', 'HTML', 'CSS'],
    location: 'Johannesburg',
  },
  {
    id: 2,
    name: 'Lebo Mashile',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'UI/UX Designer',
    skills: ['Figma', 'UX', 'CSS'],
    location: 'Cape Town',
  },
  {
    id: 3,
    name: 'Tshepo Dlamini',
    avatar: 'https://i.pravatar.cc/150?img=15',
    role: 'Backend Dev',
    skills: ['Node.js', 'MongoDB', 'APIs'],
    location: 'Pretoria',
  },
  {
    id: 4,
    name: 'Zanele Nkosi',
    avatar: 'https://i.pravatar.cc/150?img=35',
    role: 'Project Manager',
    skills: ['Agile', 'Scrum', 'Team Lead'],
    location: 'Durban',
  },
  {
    id: 5,
    name: 'Simphiwe Ndlovu',
    avatar: 'https://i.pravatar.cc/150?img=23',
    role: 'Fullstack Dev',
    skills: ['Vue', 'Node', 'Firebase'],
    location: 'Kelrksdorp',
  },

  {
    id: 6,
    name: 'Tshifhiwa Mabogo',
    avatar: 'https://i.pravatar.cc/150?img=16',
    role: 'Data Analyst',
    skills: ['Python', 'SQL', 'Tableau'],
    location: 'Thohoyandou',
  },
  {
    id: 7,
    name: 'Sipho Khumalo',
    avatar: 'https://i.pravatar.cc/150?img=50',
    role: 'DevOps Engineer',
    skills: ['Docker', 'Kubernetes', 'AWS'],
    location: 'Port Elizabeth',
  },

  {
    id: 8,
    name: 'Nandi Lesego',
    avatar: 'https://i.pravatar.cc/150?img=60',
    role: 'QA Engineer',
    skills: ['Selenium', 'Testing', 'Automation'],
    location: 'Nelspruit',
  },
  {
    id: 9,
    name: 'Thabo Mokoena',
    avatar: 'https://i.pravatar.cc/150?img=70',
    role: 'Mobile Developer',
    skills: ['Flutter', 'React Native', 'Android'],
    location: 'Bloemfontein',
  },
  {
    id: 10,
    name: 'Ndivhuwo Nefale',
    avatar: 'https://i.pravatar.cc/150?img=51',
    role: 'Content Strategist',
    skills: ['SEO', 'Content Writing', 'Marketing'],
    location: 'Thohoyandou',
  },

  {
    id: 11,
    name: 'Mpho Molefe',
    avatar: 'https://i.pravatar.cc/150?img=35',
    role: 'Graphic Designer',
    skills: ['Photoshop', 'Illustrator', 'Branding'],
    location: 'Polokwane',
  },
  {
    id: 12,
    name: 'Kgomotso Modise',
    avatar: 'https://i.pravatar.cc/150?img=10',
    role: 'Systems Analyst',
    skills: ['SQL', 'Data Modeling', 'Requirements Gathering'],
    location: 'Rustenburg',
  },

])

const filteredTeam = computed(() => {
  return team.value.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(search.value.toLowerCase()) ||
      member.skills.some(skill => skill.toLowerCase().includes(search.value.toLowerCase()))
    const matchesLocation = !selectedLocation.value || member.location === selectedLocation.value
    const matchesRole = !selectedRole.value || member.role === selectedRole.value
    return matchesSearch && matchesLocation && matchesRole
  })
})

const uniqueLocations = computed(() => [...new Set(team.value.map(m => m.location))])
const uniqueRoles = computed(() => [...new Set(team.value.map(m => m.role))])
</script>

<style scoped>
.team-explorer {
  background: #f0faff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.15);
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  color: #005b99;
  margin-bottom: 0.5rem;
}

.intro {
  margin-bottom: 1.2rem;
  color: #007acc;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.filters input,
.filters select {
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex: 1;
  min-width: 200px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.5rem;
}

.team-card {
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.2s;
}

.team-card:hover {
  transform: translateY(-4px);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 0.8rem;
}

.role {
  color: #666;
  font-weight: 600;
}

.location {
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
}

.skill {
  background: #007acc;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.no-results {
  text-align: center;
  color: #888;
  margin-top: 2rem;
  font-style: italic;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.dark .team-explorer {
  background: #1e1e1e;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.1);
}

.dark .team-card {
  background: #2c2c2c;
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.05);
}

.dark h1 {
  color: #66b2ff;
}

.dark .intro {
  color: #88c9ff;
}

.dark .role {
  color: #ccc;
}

.dark .location {
  color: #aaa;
}

.dark .filters input,
.dark .filters select {
  background-color: #333;
  color: #f0f0f0;
  border: 1px solid #555;
}

.dark .no-results {
  color: #999;
}
.dark .skill {
  background: #005b99;
  color: #f0f0f0;
}
</style>
