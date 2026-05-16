<template>
  <div>
    <h1>Новая задача</h1>
    <input v-model="text" placeholder="Что нужно сделать?" @keyup.enter="save" />
    <button @click="save">Добавить</button>
    <br><br>
    <router-link to="/">К списку задач</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const text = ref('');
const router = useRouter();

const save = () => {
  if (!text.value.trim()) return;
  
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  
  tasks.push({
    id: newId,
    text: text.value,
    completed: false
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  router.push('/');
};
</script>
