<template>
  <div class="home-container">
    <header>
      <div class="logo">
        <div class="logo-icon">
          <img src="../assets/Logo.png" alt="Logo" />
        </div>
        <span>Finances Pro</span>
      </div>
      <div class="nav-link">
        <router-link to="/features" class="nav-item">Features</router-link>
        <router-link to="/about" class="nav-item">About Us</router-link>
        <router-link to="/prices" class="nav-item">Prices</router-link>
      </div>

      <div class="header-botoms">
        <router-link to="/login" class="btn-login">Login </router-link>
        <router-link to="/register" class="btn-signup">Sign Up</router-link>
      </div>
    </header>
    <section class="hero-section">
      <div class="story-about">
        <p>OUR STORY</p>
      </div>
      <div class="info-secction">
        <h1>Building a more accessible financial future for everyone.</h1>
        <p>
          We were born with a simple idea. Personal finance shouldn't be
          complicated or boring. We believe in empowering people to take control
          of their money with smart tools and human-centered design.
        </p>
      </div>
    </section>

    <section class="second-section">
      <div class="info">
        <h2>50K+</h2>
        <p>Active users</p>
      </div>
      <div class="info">
        <h2>12M+</h2>
        <p>Generated savings</p>
      </div>
      <div class="info">
        <h2>24/7</h2>
        <p>Customer Support</p>
      </div>
      <div class="info">
        <h2>4.9/5</h2>
        <p>App Store rating</p>
      </div>
    </section>

    <section class="third-section">
      <div class="image-section">
        <img src="../assets/Imagen2.png" alt="About Us Illustration" />
      </div>
      <div class="info2-secction">
        <span>OUR MISSION</span>
        <h1>Simplify wealth, amplify life.</h1>
        <p>
          It's not just about numbers on a screen. It's about the peace of mind
          that comes from knowing you're covered in case of unexpected events,
          or the joy of planning those dream vacations without debt. Our
          platform uses advanced technology to automate the boring stuff and
          give you clear insights on what matters, allowing you to focus on
          living your life while your money works for you.
        </p>
        <div class="text-bold">
          <div class="text-bold1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 3C6.40848 3 1.71018 6.82432 0.378052 12C1.71018 17.1757 6.40848 21 12 21C17.5915 21 22.2898 17.1757 23.6219 12C22.2898 6.82432 17.5915 3 12 3ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                fill="currentColor"
              />
            </svg>
            <h3>Transparency</h3>
            <p>No small print or hidden costs. Total transparency.</p>
          </div>
          <div class="text-bold1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18 10.5C19.6569 10.5 21 11.8431 21 13.5V19.5C21 21.1569 19.6569 22.5 18 22.5H6C4.34315 22.5 3 21.1569 3 19.5V13.5C3 11.8431 4.34315 10.5 6 10.5V7.5C6 4.18629 8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5V10.5ZM12 3.5C14.2091 3.5 16 5.29086 16 7.5V10.5H8V7.5C8 5.29086 9.79086 3.5 12 3.5ZM18 12.5H6C5.44772 12.5 5 12.9477 5 13.5V19.5C5 20.0523 5.44772 20.5 6 20.5H18C18.5523 20.5 19 20.0523 19 19.5V13.5C19 12.9477 18.5523 12.5 18 12.5Z"
                fill="currentColor"
              />
            </svg>
            <h3>Security</h3>
            <p>Your data is yours. Protected with the highest standard.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="fourth-section">
      <div class=""></div>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
/* ============================================ */
/* ESTILOS GLOBALES Y CONTENEDOR PRINCIPAL */
/* ============================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Contenedor principal de toda la página */
.home-container {
  width: 100%;
  min-height: 100vh;
  color: #ffffff;
}

/* ============================================ */
/* ENCABEZADO (HEADER) */
/* ============================================ */

/* Barra superior con logo, navegación y botones */
header {
  width: 100%;
  height: 60px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #112218;
  border-bottom: 1px solid #2e5c31;
}

/* Logo y texto "Finances Pro" */
.logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
}

/* Espaciado del texto del logo */
.logo span {
  margin-left: 10px;
}

/* Contenedor del ícono del logo */
.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Imagen del ícono del logo */
.logo-icon img {
  width: 50px;
  height: 50px;
}

/* Contenedor de los links de navegación */
.nav-link {
  display: flex;
  gap: 20px;
}

/* Estilos individuales de cada link (Features, About Us, Prices) */
.nav-item {
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s;
  padding: 10px 15px;
}

/* Efecto hover en los links de navegación */
.nav-item:hover {
  background-color: #2e5c31;
  border-radius: 4px;
}

/* Contenedor de los botones (Login y Sign Up) */
.header-botoms {
  display: flex;
  gap: 10px;
}

/* Botón Login - Estilo base */
.btn-login {
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
}

/* Botón Sign Up - Estilo base */
.btn-signup {
  padding: 10px 40px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: #000000;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Color base del botón Login */
.btn-login {
  background-color: #2e5c31;
}

/* Efecto hover del botón Login */
.btn-login:hover {
  background-color: #3acf41;
  color: #000000;
}

/* Color base del botón Sign Up */
.btn-signup {
  background-color: #3acf41;
}

/* Efecto hover del botón Sign Up */
.btn-signup:hover {
  background-color: #2e5c31;
  color: #ffffff;
}

/* ============================================ */
/* SECCIÓN HERO (PRINCIPAL) */
/* ============================================ */

/* Contenedor principal de la sección hero */
.hero-section {
  display: flex;
  padding: 40px 60px;
  background-color: #112218;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
}

.story-about {
  color: #3acf41;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.info-secction {
  text-align: center;
  max-width: 800px;
  margin-top: 20px;
  gap: 20px;
}

.info-secction h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.info-secction p {
  font-size: 20px;
  line-height: 1.6;
  color: #d1d5db;
}

/* Contenedor principal de la segunda sección */
.second-section {
  display: flex;
  padding: 60px 80px;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 300px;
}

.info {
  text-align: center;
}

.info h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.info p {
  font-size: 18px;
  color: #d1d5db;
}

.third-section {
  display: flex;
  flex-direction: row;
  padding: 60px 80px;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #112218;
}

.image-section img {
  width: 500px;
  height: auto;
  margin-right: 60px;
}

.info2-secction {
  max-width: 600px;
}

.info2-secction span {
  color: #3acf41;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  display: inline-block;
}

.info2-secction h1 {
  font-size: 42px;
  margin-bottom: 20px;
}

.info2-secction p {
  font-size: 20px;
  line-height: 1.6;
  font-weight: 600;
  margin-bottom: 10px;
  color: #d1d5db;
}

.text-bold {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
}

.text-bold1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
}
.text-bold1 h3 {
  font-size: 22px;
  margin-top: 10px;
}

.text-bold1 p {
  font-size: 16px;
  color: #d1d5db;
}

.text-bold1 svg {
  color: #3acf41;
  margin-right: 12px;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
