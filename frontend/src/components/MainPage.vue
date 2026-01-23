<template>
  <div class="main-page">
    <nav class="sidebar">
      <div class="logo">
        <div class="logo-icon">
          <img src="../assets/Logo.png" alt="Logo" />
        </div>
        <span>Finances Pro</span>
      </div>
      <div class="nav-links">
        <!--Resumen-->
        <router-link to="/dashboard" class="nav-link">Summary</router-link>
        <!--Presupuestos-->
        <router-link to="/budgets" class="nav-link">Budgets</router-link>
        <!--Metas-->
        <router-link to="/goals" class="nav-link">Goals</router-link>
        <!--Transacciones-->
        <router-link to="/transactions" class="nav-link"
          >Transactions</router-link
        >
        <!--Deudas-->
        <router-link to="/debts" class="nav-link">Debts</router-link>
        <!--Categorías-->
        <router-link to="/categories" class="nav-link">Categories</router-link>
        <!--Reportes-->
        <router-link to="/reports" class="nav-link">Reports</router-link>
        <!--Configuraciones-->
        <router-link to="/settings" class="nav-link">Settings</router-link>
      </div>
    </nav>

    <section class="main-content">
      <!-- Main content goes here -->
    </section>
  </div>
</template>
<script setup></script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-page {
  display: flex;
  height: 100vh;
  background-color: #f6f8f8;
  font-family: manrope, sans-serif;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: #000000;
}

.logo span {
  margin-left: 10px;
}
.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon img {
  width: 50px;
  height: 50px;
}

.sidebar {
  width: 250px;
  background-color: #ebebeb;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-right: 1px solid #112218;
  gap: 30px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav-link {
  text-decoration: none;
  color: #000000;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.nav-link:hover {
  background-color: #2e5c31;
  color: #ffffff;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
