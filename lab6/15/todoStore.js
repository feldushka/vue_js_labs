import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('tasks') || '[]'))

  const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  const addTask = (text) => {
    const newId = tasks.value.length > 0 ? tasks.value[tasks.value.length - 1].id + 1 : 1
    tasks.value.push({
      id: newId,
      text: text,
      completed: false
    })
    saveToLocalStorage()
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
    saveToLocalStorage()
  }

  const toggleTaskStatus = (id) => {
    const task = tasks.value.find(task => task.id === id)
    if (task) {
      task.completed = !task.completed
      saveToLocalStorage()
    }
  }

  const getTaskById = (id) => {
    return tasks.value.find(task => task.id === id)
  }

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTaskStatus,
    getTaskById
  }
})
