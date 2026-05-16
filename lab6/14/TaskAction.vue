<template>
  <div class="message">
    <h2>{{ statusMessage }}</h2>
    <router-link to="/">Назад к списку</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['mode'])
const route = useRoute()
const statusMessage = ref('')

onMounted(() => {
  const id = parseInt(route.params.id)
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]')

  if (props.mode === 'delete') {
    tasks = tasks.filter(t => t.id !== id)
    statusMessage.value = "Task deleted" // 
  } else {
    const task = tasks.find(t => t.id === id)
    if (task) task.completed = !task.completed
    statusMessage.value = "Task status has been changed" // 
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks))
})
</script>
