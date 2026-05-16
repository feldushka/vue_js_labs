<template>
  <div class="message">
    <h2>{{ statusMessage }}</h2>
    <router-link to="/">Назад к списку</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTodoStore } from '../stores/todoStore'

const props = defineProps(['mode'])
const route = useRoute()
const store = useTodoStore()
const statusMessage = ref('')

onMounted(() => {
  const id = parseInt(route.params.id)

  if (props.mode === 'delete') {
    store.deleteTask(id)
    statusMessage.value = "Task deleted"
  } else {
    store.toggleTaskStatus(id)
    statusMessage.value = "Task status has been changed"
  }
})
</script>
