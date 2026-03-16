<template>
  <div class="transactions-container">
    <header class="transactions-header">
      <h1>Transactions</h1>
    </header>
    <div class="transactions-content">
      <div class="button-group">
        <button @click="openModal()" class="btn-primary">+ create transaction</button>
      </div>

      <div v-if="transactions.length === 0" class="empty-state">
        <p>No transactions available. Please add a new transaction.</p>
      </div>

      <div v-else class="transactions-section">
        <div class="controls">
          <div class="search">
            <input
              type="text"
              id="text"
              v-model="search"
              placeholder="Search transaction..."
            />
          </div>
          <div class="filters">
            <select v-model="filterCategory">
              <option value="">All categories</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.name"
              >
                {{ category.name }}
              </option>
            </select>

            <select v-model="filterType">
              <option value="">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <select v-model="filterDate">
              <option value="">All dates</option>
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
            </select>
          </div>
        </div>
        <div class="transactions-list">
          <table class="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in filteredTransactions"
                :key="transaction.id"
              >
                <td>{{ formatDate(transaction.transaction_date) }}</td>
                <td>{{ transaction.description }}</td>
                <td>{{ transaction.category_name }}</td>
                <td>{{ transaction.type }}</td>
                <td>${{ transaction.amount }}</td>
                <td>
                  <button
                    @click="editTransaction(transaction.id)"
                    class="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteTransaction(transaction.id)"
                    class="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <transition name="modal-fade">
      <div v-if="showModal" class="modal" @click="closeModel">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>
              {{ isEditMode ? "Edit Transaction" : "Create Transaction" }}
            </h2>
            <button type="button" class="modal-close" @click="closeModel">
              ×
            </button>
          </div>
          <p class="modal-subtitle">
            Manage your transactions safely and efficiently
          </p>

          <form
            @submit.prevent="
              isEditMode ? updateTransaction() : addTransaction()
            "
            class="transaction-form"
          >
            <div class="form-row">
              <div class="form-group">
                <label for="date">Date</label>
                <input
                  type="date"
                  id="date"
                  v-model="form.transaction_date"
                  required
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="type">Type</label>
                <select
                  id="type"
                  v-model="form.type"
                  required
                  class="form-input"
                >
                  <option value="" disabled>Select a type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="amount">Amount</label>
              <div class="amount-input-wrapper">
                <span class="currency">$</span>
                <input
                  type="number"
                  id="amount"
                  v-model="form.amount"
                  step="0.01"
                  required
                  class="form-input"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <input
                type="text"
                id="description"
                v-model="form.description"
                required
                class="form-input"
                placeholder="Ex: Grocery shopping"
              />
            </div>

            <div class="form-group">
              <label for="category">Category</label>
              <select
                id="category"
                v-model="form.category_id"
                required
                class="form-input"
              >
                <option value="" disabled>Select a category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="payment-method">Payment Method</label>
              <select
                id="payment-method"
                v-model="form.payment_method"
                class="form-input"
              >
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="transfer">Bank Transfer</option>
                <option value="digital_wallet">Digital Wallet</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="notes">Notes</label>
              <textarea
                id="notes"
                v-model="form.notes"
                class="form-input"
                placeholder="Add any additional notes..."
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="debt">Related Debt (optional)</label>
              <select id="debt" v-model="form.debt_id" class="form-input">
                <option :value="null">No debt</option>
                <option v-for="debt in debts" :key="debt.id" :value="debt.id">
                  {{ debt.name }} - ${{ debt.total_amount }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="form.is_recurring"
                  class="form-checkbox"
                />
                Is this a recurring transaction?
              </label>
            </div>

            <div v-if="form.is_recurring" class="form-group">
              <label for="recurring-frequency">Recurring Frequency</label>
              <select
                id="recurring-frequency"
                v-model="form.recurring_frequency"
                class="form-input"
              >
                <option value="" disabled>Select frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div class="form-actions">
              <button type="button" @click="closeModel" class="btn-cancel">
                Cancel
              </button>
              <button type="submit" class="btn-submit">
                {{ isEditMode ? "Update" : "Add" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

// Estados
const transactions = ref([]);
const categories = ref([]);
const debts = ref([]);
const showModal = ref(false);
const loading = ref(false);
const isEditMode = ref(false);
const editingId = ref(null);

// Filtros
const search = ref("");
const filterCategory = ref("");
const filterType = ref("");
const filterDate = ref("");

// Formulario
const form = ref({
  category_id: "",
  type: "expense",
  amount: "",
  description: "",
  payment_method: "cash",
  transaction_date: new Date().toISOString().split("T")[0],
  is_recurring: false,
  recurring_frequency: null,
  notes: "",
  debt_id: null,
});

// Obtener token
const getToken = () => {
  return localStorage.getItem("token");
};

// Cargar categorías
const loadCategories = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No hay token de autenticación");
      return;
    }

    const response = await axios.get("http://localhost:3000/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    categories.value = response.data;
    console.log("✅ Categories loaded:", categories.value.length);
  } catch (error) {
    console.error("❌ Error loading categories:", error);
    window.showNotification('Error loading categories', 'error');
  }
};

// Cargar deudas
const loadDebts = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No hay token de autenticación");
      return;
    }

    const response = await axios.get("http://localhost:3000/api/debts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    debts.value = response.data;
    console.log("✅ Debts loaded:", debts.value.length);
  } catch (error) {
    console.error("❌ Error loading debts:", error);
  }
};

// Cargar transacciones
const loadTransactions = async () => {
  loading.value = true;
  try {
    const token = getToken();
    if (!token) {
      console.error("No hay token de autenticación");
      return;
    }

    const response = await axios.get("http://localhost:3000/api/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    transactions.value = response.data;
    console.log("✅ Transactions loaded:", transactions.value.length);
  } catch (error) {
    console.error("❌ Error loading transactions:", error);
    window.showNotification('Error loading transactions', 'error');
  } finally {
    loading.value = false;
  }
};

// Transacciones filtradas
const filteredTransactions = computed(() => {
  let result = transactions.value;

  // Filtrar por búsqueda
  if (search.value) {
    result = result.filter((t) =>
      t.description?.toLowerCase().includes(search.value.toLowerCase()),
    );
  }

  // Filtrar por categoría
  if (filterCategory.value) {
    result = result.filter((t) => {
      const category = categories.value.find((c) => c.id === t.category_id);
      return category?.name === filterCategory.value;
    });
  }

  // Filtrar por tipo
  if (filterType.value) {
    result = result.filter((t) => t.type === filterType.value);
  }

  // Filtrar por fecha
  if (filterDate.value) {
    const now = new Date();
    const days = {
      last7: 7,
      last30: 30,
      last90: 90,
    }[filterDate.value];

    if (days) {
      const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      result = result.filter((t) => new Date(t.transaction_date) >= startDate);
    }
  }

  return result;
});

// Obtener nombre de categoría
const getCategoryName = (categoryId) => {
  const category = categories.value.find((c) => c.id === categoryId);
  return category ? category.name : "Sin categoría";
};

// Obtener color de categoría
const getCategoryColor = (categoryId) => {
  const category = categories.value.find((c) => c.id === categoryId);
  return category ? category.color : "#95A5A6";
};

// Formatear fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Formatear monto
const formatAmount = (amount, type) => {
  const formatted = parseFloat(amount).toFixed(2);
  const symbol = type === "income" ? "+" : "-";
  const color = type === "income" ? "#2ecc71" : "#e74c3c";
  return { formatted: `${symbol} $${formatted}`, color };
};

// Abrir modal para crear
const openModal = () => {
  isEditMode.value = false;
  editingId.value = null;
  form.value = {
    category_id: "",
    type: "expense",
    amount: "",
    description: "",
    payment_method: "cash",
    transaction_date: new Date().toISOString().split("T")[0],
    is_recurring: false,
    recurring_frequency: null,
    notes: "",
    debt_id: null,
  };
  showModal.value = true;
};

// Cerrar modal
const closeModel = () => {
  showModal.value = false;
};

// Agregar transacción
const addTransaction = async () => {
  try {
    if (
      !form.value.category_id ||
      !form.value.amount ||
      !form.value.transaction_date
    ) {
      window.showNotification('Please fill in all required fields', 'warning');
      return;
    }

    loading.value = true;
    const token = getToken();

    const response = await axios.post(
      "http://localhost:3000/api/transactions",
      form.value,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("✅ Transaction created:", response.data);
    await loadTransactions();
    closeModel();
    // Notificar a otros componentes que se actualizó una transacción
    console.log("📢 Dispatching transactionUpdated event from Transactions");
    window.dispatchEvent(new CustomEvent("transactionUpdated"));
    window.showNotification('Transaction created successfully', 'success');
  } catch (error) {
    console.error("❌ Error creating transaction:", error);
    window.showNotification(error.response?.data?.message || 'Error creating transaction', 'error');
  } finally {
    loading.value = false;
  }
};

// Editar transacción
const editTransaction = async (id) => {
  const transaction = transactions.value.find((t) => t.id === id);
  if (!transaction) return;

  isEditMode.value = true;
  editingId.value = id;
  form.value = {
    category_id: transaction.category_id,
    type: transaction.type,
    amount: transaction.amount,
    description: transaction.description || "",
    payment_method: transaction.payment_method || "cash",
    transaction_date: transaction.transaction_date,
    is_recurring: transaction.is_recurring || false,
    recurring_frequency: transaction.recurring_frequency || null,
    notes: transaction.notes || "",
    debt_id: transaction.debt_id || null,
  };
  showModal.value = true;
};

// Actualizar transacción
const updateTransaction = async () => {
  try {
    if (
      !form.value.category_id ||
      !form.value.amount ||
      !form.value.transaction_date
    ) {
      window.showNotification('Please fill in all required fields', 'warning');
      return;
    }

    loading.value = true;
    const token = getToken();

    await axios.put(
      `http://localhost:3000/api/transactions/${editingId.value}`,
      form.value,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("✅ Transaction updated");
    await loadTransactions();
    closeModel();
    // Notificar a otros componentes que se actualizó una transacción
    window.dispatchEvent(new CustomEvent("transactionUpdated"));
    window.showNotification('Transaction updated successfully', 'success');
  } catch (error) {
    console.error("❌ Error updating transaction:", error);
    window.showNotification(
      error.response?.data?.message || 'Error updating transaction',
      'error',
    );
  } finally {
    loading.value = false;
  }
};

// Eliminar transacción
const deleteTransaction = async (id) => {
  const confirmed = await window.showConfirmation({
    title: 'Delete Transaction',
    message: 'Are you sure you want to delete this transaction? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    danger: true
  });
  
  if (!confirmed) return;

  try {
    const token = getToken();

    await axios.delete(`http://localhost:3000/api/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Transacción eliminada");
    await loadTransactions();
    // Notificar a otros componentes que se actualizó una transacción
    window.dispatchEvent(new CustomEvent("transactionUpdated"));
    window.showNotification('Transaction deleted successfully', 'success');
  } catch (error) {
    console.error("❌ Error deleting transaction:", error);
    window.showNotification(error.response?.data?.message || 'Error deleting transaction', 'error');
  }
};

// Cargar datos al montar
onMounted(() => {
  loadCategories();
  loadDebts();
  loadTransactions();

  // Recargar transacciones cada 3 segundos
  const intervalId = setInterval(() => {
    loadTransactions();
  }, 3000);

  // Recargar cuando el usuario vuelve a esta pestaña
  const handleFocus = () => {
    loadTransactions();
  };
  window.addEventListener("focus", handleFocus);

  // Limpiar al desmontar el componente
  return () => {
    clearInterval(intervalId);
    window.removeEventListener("focus", handleFocus);
  };
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.transactions-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.transactions-header {
  display: flex;
  align-items: center;
  background-color: #f8fdf8;
  color: #1a7f3a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  padding: 20px 30px;
  border-bottom: 1px solid #e0e8e0;
  width: 100%;
}

.transactions-header h1 {
  font-size: 28px;
  font-weight: 600;
}

.transactions-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.button-group .btn-primary {
  background-color: #1a7f3a;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(26, 127, 58, 0.2);
}

.button-group .btn-primary:hover {
  background-color: #166f33;
  box-shadow: 0 4px 12px rgba(26, 127, 58, 0.3);
  transform: translateY(-2px);
}

.empty-state {
  text-align: center;
  color: #888888;
  font-size: 18px;
  margin-top: 50px;
}

.transactions-section {
  margin-top: 20px;
}
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
}
.search input {
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  min-width: 250px;
  transition: all 0.2s ease;
  font-family: inherit;
}
.search input:focus {
  outline: none;
  border-color: #1a7f3a;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(26, 127, 58, 0.1);
}
.search input::placeholder {
  color: #999;
}
.filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.filters select {
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  min-width: 150px;
}
.filters select:hover {
  border-color: #d0d0d0;
}
.filters select:focus {
  outline: none;
  border-color: #1a7f3a;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(26, 127, 58, 0.1);
}

.transaction-item {
  border-bottom: 1px solid #e0e8e0;
  padding: 10px 0;
}
.transactions-list {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid #f0f0f0;
}
.transactions-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
}
.transactions-table th {
  text-align: left;
  padding: 16px 16px;
  background-color: #f8fdf8;
  border-bottom: 1px solid #e0e8e0;
  font-weight: 600;
  color: #1a7f3a;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.transactions-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f5f5f5;
  font-size: 14px;
  color: #333;
}
.transactions-table tbody tr:hover {
  background-color: #fafafa;
  transition: background-color 0.15s ease;
}
.transactions-table tbody tr:last-child td {
  border-bottom: none;
}
.edit-btn,
.delete-btn {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 6px;
}
.edit-btn {
  background-color: #1a7f3a;
  color: white;
}
.edit-btn:hover {
  background-color: #166f33;
  box-shadow: 0 2px 6px rgba(26, 127, 58, 0.2);
  transform: translateY(-1px);
}
.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(220, 53, 69, 0.2);
}
.delete-btn:hover {
  background-color: #c82333;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  transform: translateY(-1px);
}
/* Modal Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal-content {
  background-color: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1a7f3a;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 28px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background-color: #f5f5f5;
  color: #333;
}

.modal-subtitle {
  padding: 0 24px 12px;
  color: #666;
  font-size: 13px;
  margin: 0;
}

.transaction-form {
  padding: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-row .form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;
  background-color: #fafafa;
}

.form-input:focus {
  outline: none;
  border-color: #1a7f3a;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(26, 127, 58, 0.1);
}

.form-input:hover {
  border-color: #d0d0d0;
}

.form-input textarea {
  resize: vertical;
  min-height: 70px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
  color: #333;
  cursor: pointer;
  text-transform: capitalize;
}

.form-checkbox {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
  accent-color: #1a7f3a;
}

.amount-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 12px;
  color: #999;
  font-weight: 500;
  font-size: 14px;
  pointer-events: none;
}

.amount-input-wrapper .form-input {
  padding-left: 28px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.btn-cancel,
.btn-submit {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #333;
}

.btn-cancel:hover {
  background-color: #e8e8e8;
}

.btn-submit {
  background-color: #1a7f3a;
  color: #ffffff;
}

.btn-submit:hover {
  background-color: #166f33;
  box-shadow: 0 4px 12px rgba(26, 127, 58, 0.25);
}

.btn-submit:active {
  transform: scale(0.98);
}
</style>
