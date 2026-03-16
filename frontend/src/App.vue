<template>
  <div id="app">
    <Notification ref="notificationRef" />
    <Confirmation ref="confirmationRef" />
    <router-view />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Notification from './components/Notification.vue';
import Confirmation from './components/Confirmation.vue';

const notificationRef = ref(null);
const confirmationRef = ref(null);

// Exponer globalmente para usar desde cualquier componente
if (typeof window !== 'undefined') {
  window.showNotification = (message, type = 'info', duration = 4000) => {
    if (notificationRef.value) {
      notificationRef.value.showNotification(message, type, duration);
    }
  };
  
  window.showConfirmation = async (options) => {
    if (confirmationRef.value) {
      return await confirmationRef.value.openConfirmation(options);
    }
  };
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  min-height: 100vh;
  background-color: #0c140f;
  font-family: manrope, sans-serif;
}
</style>
