<template>
  <div class="login-container">
    <header>
      <div class="logo">
        <div class="logo-icon">
          <img src="../assets/Logo.png" alt="Logo" />
        </div>
        <span>Finances Pro</span>
      </div>
      <div class="header-botoms">
        <router-link to="/help" class="btn-help">Help</router-link>
      </div>
    </header>
    <div class="form-container">
      <h2>Welcome back</h2>
      <p>Manage your finances securely</p>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <a class="forget-password" href="#">Did you forget your password?</a>

        <button type="submit" class="btn-login">Login</button>
      </form>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <p class="register-link">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script></script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  width: 100%;
  min-height: 100vh;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a1a0f 0%, #112218 100%);
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #112218;
  border-bottom: 1px solid #2e5c31;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
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

.btn-help {
  padding: 10px 50px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: #ffffff;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2e5c31;
}
.header-botoms {
  display: flex;
  gap: 10px;
}

.btn-help:hover {
  background-color: #3acf41;
  color: #000000;
}

.form-container {
  width: 500px;
  padding: 50px 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(17, 34, 24, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid #2e5c31;
  backdrop-filter: blur(10px);
  max-height: 90vh;
  overflow-y: auto;
}

.form-container h2 {
  font-size: 32px;
  margin-bottom: 10px;
  color: #ffffff;
  text-align: center;
}

.form-container p {
  font-size: 18px;
  margin-bottom: 30px;
  color: #cccccc;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  color: #ffffff;
  font-size: 14px;
}

.form-group input {
  padding: 12px 16px;
  border: 1px solid #2e5c31;
  border-radius: 4px;
  font-size: 16px;
  background-color: #1a2e23;
  color: #ffffff;
  transition: border-color 0.3s;
}

.form-group input::placeholder {
  color: #6b8775;
}

.form-group input:focus {
  outline: none;
  border-color: #3acf41;
}

.forget-password {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: #3acf41;
  text-decoration: none;
}

.forget-password:hover {
  text-decoration: underline;
}

.btn-login {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  background-color: #2e5c31;
  color: #ffffff;
  transition: background-color 0.3s;
}

.btn-login:hover {
  background-color: #3acf41;
  color: #000000;
}

.error-message {
  margin-top: 20px;
  color: #ff4d4f;
  font-size: 14px;
}

.register-link {
  margin-top: 20px;
  font-size: 14px;
  color: #cccccc;
}

.register-link a {
  color: #3acf41;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
