<template>
  <nav>
    <router-link to="/">Список задач</router-link> |
    <router-link to="/add">Добавить задачу</router-link> |
    <router-link to="/about">О нас</router-link>
  </nav>
  <hr />
  
  <router-view></router-view>
</template>

<style>
nav {
  padding: 10px;
  margin-bottom: 20px;
  background: #f4f4f4;
}
router-link {
  margin: 0 10px;
}
.message {
  color: green;
  font-weight: bold;
}
</style>
