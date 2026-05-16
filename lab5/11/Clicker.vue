<template>
  <div class="clicker-card">
    <span @click="handleClick" class="clickable-area">
      <slot></slot>
    </span>
    
    <p class="score">Очки: {{ count }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  amount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['button-clicked'])

const count = ref(0)

const handleClick = () => {
  count.value += props.amount
  emit('button-clicked')
}
</script>

<style scoped>
.clicker-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 5px;
  border-radius: 8px;
  display: inline-block;
  text-align: center;
  background-color: #f9f9f9;
}
.clickable-area {
  display: inline-block;
  cursor: pointer;
}
.score {
  margin-top: 10px;
  font-weight: bold;
}
</style>
