import { createRouter, createWebHistory } from 'vue-router'
import TodoList from './views/TodoList.vue'
import AddTask from './views/AddTask.vue'
import TaskAction from './views/TaskAction.vue'

const routes = [
  { path: '/', component: TodoList }, // 
  { path: '/add', component: AddTask }, // 
  { path: '/task/:id', component: () => import('./views/TaskDetail.vue') }, // 
  { path: '/task/:id/delete', component: TaskAction, props: { mode: 'delete' } }, // 
  { path: '/task/:id/complete', component: TaskAction, props: { mode: 'complete' } }, // 
  { path: '/about', component: () => import('./views/About.vue') } // 
]

export default createRouter({
  history: createWebHistory(),
  routes
})
