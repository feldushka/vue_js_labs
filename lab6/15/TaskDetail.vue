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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTodoStore } from '../stores/todoStore'

const route = useRoute()
const store = useTodoStore()

const id = parseInt(route.params.id)
const task = computed(() => store.getTaskById(id))
</script>
