<template>
  <teleport to="body">
    <div v-if="isOpen" class="modal-backdrop">
      <div class="modal-content">
        <slot></slot>
        <div class="modal-actions">
          <button @click="$emit('close')" class="btn-cancel">No</button>
          <button @click="$emit('confirm')" class="btn-confirm">Yes</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  isOpen: Boolean
});
defineEmits(['close', 'confirm']);
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.btn-confirm { background: #3085d6; color: white; }
.btn-cancel { background: #aaa; color: white; }
</style>
