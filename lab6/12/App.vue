<script setup>
import { ref, onMounted, watch } from 'vue';
import Popup from './components/Popup.vue';

const tasks = ref([]);
const newTaskTitle = ref('');
const isPopupOpen = ref(false);
const taskToDelete = ref(null);


const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';


onMounted(async () => {
  const savedTasks = localStorage.getItem('todo-tasks');
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  } else {
    const response = await fetch(API_URL);
    tasks.value = await response.json();
  }
});


watch(tasks, (newVal) => {
  localStorage.setItem('todo-tasks', JSON.stringify(newVal));
}, { deep: true });


const addTask = async () => {
  if (!newTaskTitle.value.trim()) return;
  
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title: newTaskTitle.value, completed: false, userId: 1 }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });

  if (response.ok) {
    tasks.value.unshift({ id: Date.now(), title: newTaskTitle.value, completed: false });
    newTaskTitle.value = '';
  }
};


const toggleTask = async (task) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed: !task.completed }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
  
  if (response.ok) {
    task.completed = !task.completed;
  }
};


const confirmDelete = (id) => {
  taskToDelete.value = id;
  isPopupOpen.value = true;
};

const deleteTask = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskToDelete.value}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    tasks.value = tasks.value.filter(t => t.id !== taskToDelete.value);
    isPopupOpen.value = false;
    taskToDelete.value = null;
  }
};
</script>

<template>
  <div class="todo-app">
    <h1>ToDo List</h1>
    
    <div class="input-group">
      <input v-model="newTaskTitle" placeholder="New Task" @keyup.enter="addTask" />
      <button @click="addTask">Add</button>
    </div>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" :checked="task.completed" @change="toggleTask(task)" />
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
        <button class="delete-btn" @click="confirmDelete(task.id)">del</button>
      </li>
    </ul>

    <Popup 
      :isOpen="isPopupOpen" 
      @close="isPopupOpen = false" 
      @confirm="deleteTask"
    >
    </Popup>
  </div>
</template>

<style>
.completed { text-decoration: line-through; color: gray; }
.todo-app { max-width: 400px; margin: auto; font-family: sans-serif; }
.input-group { display: flex; gap: 10px; margin-bottom: 20px; }
.delete-btn { color: red; border: none; background: none; cursor: pointer; }
.warning-icon { color: orange; font-size: 40px; border: 2px solid orange; border-radius: 50%; width: 50px; margin: auto; }
</style>
