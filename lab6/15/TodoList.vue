<template>
  <div>
    <h1>Список задач (Pinia)</h1>
    <router-link to="/add">Добавить новую задачу</router-link>
    <ul>
      <li v-for="task in store.tasks" :key="task.id">
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
import { useTodoStore } from '../stores/todoStore'

const store = useTodoStore()
</script>
