<template>
  <div>
    <h1>Список задач</h1>
    <router-link to="/add">Добавить новую задачу</router-link>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <router-link :to="'/task/' + task.id">{{ task.text }}</router-link>
        [{{ task.completed ? 'Выполнено' : 'В работе' }}]
        | <router-link :to="'/task/' + task.id + '/complete'">Изменить статус</router-link>
        | <router-link :to="'/task/' + task.id + '/delete'">Удалить</router-link>
      </li>
    </ul>
    <hr>
    <router-link to="/about">О нас</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const tasks = ref([]);

onMounted(() => {
  tasks.value = JSON.parse(localStorage.getItem('tasks') || '[]');
});
</script>
