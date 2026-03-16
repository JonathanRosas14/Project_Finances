<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="confirmation-overlay">
      <div class="confirmation-modal">
        <div class="confirmation-header">
          <h2>{{ title }}</h2>
        </div>
        <div class="confirmation-body">
          <p>{{ message }}</p>
        </div>
        <div class="confirmation-footer">
          <button class="btn btn-cancel" @click="cancel">
            {{ cancelText }}
          </button>
          <button :class="['btn', dangerMode ? 'btn-danger' : 'btn-confirm']" @click="confirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const title = ref('Confirm');
const message = ref('Are you sure?');
const confirmText = ref('Confirm');
const cancelText = ref('Cancel');
const dangerMode = ref(false);
let resolveCallback = null;

const openConfirmation = (options = {}) => {
  return new Promise((resolve) => {
    title.value = options.title || 'Confirm';
    message.value = options.message || 'Are you sure?';
    confirmText.value = options.confirmText || 'Confirm';
    cancelText.value = options.cancelText || 'Cancel';
    dangerMode.value = options.danger || false;
    resolveCallback = resolve;
    isOpen.value = true;
  });
};

const confirm = () => {
  isOpen.value = false;
  if (resolveCallback) resolveCallback(true);
};

const cancel = () => {
  isOpen.value = false;
  if (resolveCallback) resolveCallback(false);
};

// Exponer globalmente
window.showConfirmation = openConfirmation;

defineExpose({
  openConfirmation,
  confirm,
  cancel,
});
</script>

<style scoped>
.confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.confirmation-modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.confirmation-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid #eee;
}

.confirmation-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.3em;
}

.confirmation-body {
  padding: 24px;
  color: #666;
  font-size: 1em;
  line-height: 1.6;
}

.confirmation-body p {
  margin: 0;
}

.confirmation-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #eee;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
}

.btn-cancel {
  background: #f0f0f0;
  color: #333;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-confirm {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
}
</style>
