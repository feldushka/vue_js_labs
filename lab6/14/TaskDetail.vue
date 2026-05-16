<template>
  <div v-if="task">
    <h1>Задача №{{ task.id }}</h1>
    <p><strong>Текст:</strong> {{ task.text }}</p>
    <p><strong>Статус:</strong> {{ task.completed ? 'Завершена' : 'Не завершена' }}</p>
    <router-link to="/">Назад к списку</router-link>
  </div>
  <div v-else>
    <p>Задача не найдена</p>
    <router-link to="/">К списку</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const task = ref(null);

onMounted(() => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  task.value = tasks.find(t => t.id === parseInt(route.params.id));
});
</script>
