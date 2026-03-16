<template>
  <Transition name="fade">
    <div v-if="notification" :class="['notification', notification.type]">
      <div class="notification-content">
        <span class="notification-icon">{{ getIcon() }}</span>
        <span class="notification-message">{{ notification.message }}</span>
        <button class="notification-close" @click="closeNotification">✕</button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const notification = ref(null);
let autoCloseTimer = null;

const getIcon = () => {
  if (!notification.value) return '';
  switch (notification.value.type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '⚠';
    case 'info':
      return 'ℹ';
    default:
      return '●';
  }
};

const closeNotification = () => {
  if (autoCloseTimer) clearTimeout(autoCloseTimer);
  notification.value = null;
};

const showNotification = (message, type = 'info', duration = 4000) => {
  notification.value = { message, type };
  
  if (autoCloseTimer) clearTimeout(autoCloseTimer);
  
  autoCloseTimer = setTimeout(closeNotification, duration);
};

// Exponer el método en la ventana global para usar desde cualquier parte
window.showNotification = showNotification;

defineExpose({
  showNotification,
  closeNotification,
});
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  max-width: 500px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  z-index: 9999;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.notification-icon {
  font-weight: bold;
  min-width: 24px;
  text-align: center;
  font-size: 1.1em;
}

.notification-message {
  flex: 1;
  word-break: break-word;
}

.notification-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  padding: 0;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.notification-close:hover {
  opacity: 1;
}

/* Success */
.notification.success {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  color: #155724;
  border-left: 4px solid #28a745;
}

/* Error */
.notification.error {
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  color: #721c24;
  border-left: 4px solid #dc3545;
}

/* Warning */
.notification.warning {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%);
  color: #856404;
  border-left: 4px solid #ffc107;
}

/* Info */
.notification.info {
  background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
  color: #0c5460;
  border-left: 4px solid #17a2b8;
}

@media (max-width: 480px) {
  .notification {
    left: 10px;
    right: 10px;
    min-width: auto;
  }
}
</style>
