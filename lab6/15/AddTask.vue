<template>
  <div>
    <h1>Новая задача</h1>
    <input v-model="text" placeholder="Что нужно сделать?" @keyup.enter="handleSave" />
    <button @click="handleSave">Добавить</button>
    <br><br>
    <router-link to="/">К списку задач</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todoStore'

const text = ref('')
const router = useRouter()
const store = useTodoStore()

const handleSave = () => {
  if (!text.value.trim()) return
  
  store.addTask(text.value)
  
  text.value = ''
  router.push('/')
}
</script>
