<template>
  <div class="home-container">
    <!-- Header -->
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
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="card-section">
        <div class="info-secction">
          <h1>Master your money, design your future</h1>
          <p>
            The smart platform to manage expenses, investments, and savings all
            in one place. Take control of your finances today.
          </p>
          <router-link to="/register" class="btn-creat-account">
            Create a free account</router-link
          >
          <p>🔐 Encrypted and secure data</p>
        </div>
        <div class="image-section">
          <img src="../assets/Imagen1.png" alt="Hero Image" />
        </div>
      </div>
    </section>
    <!-- Additional Sections -->
    <section class="second-section">
      <div class="card2-section">
        <div class="info2-section">
          <h1>Everything you need to grow</h1>
          <p>
            Powerful tools designed to simplify your financial life and help you
            make better decisions
          </p>
        </div>
        <div class="card-infos">
          <div class="cards">
            <img src="../assets/Icon1.png" alt="Icon 1" />
            <h2>Expense Tracking</h2>
            <p>
              Monitor your spending habits with ease and gain insights into
              where your money goes.
            </p>
          </div>
          <div class="cards">
            <img src="../assets/Icon2.png" alt="Icon 2" />
            <h2>Investment Management</h2>
            <p>
              Track your investment portfolio and make informed decisions to
              maximize returns.
            </p>
          </div>
          <div class="cards">
            <img src="../assets/Icon3.png" alt="Icon 3" />
            <h2>Savings Goals</h2>
            <p>
              Set and achieve your savings goals with personalized plans and
              progress tracking.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="third-section">
      <!-- Future content can be added here -->
      <div class="info3-section">
        <h1>Plan for what matters</h1>
        <p>Save money for your next big moments.</p>
      </div>
      <div class="imagenes">
        <div class="img1">
          <img src="../assets/Imagen2.png" alt="Image 2" />
          <div class="hero-overlay">
            <p>Own home</p>
            <p>Goal: $450,000</p>
          </div>
        </div>
        <div class="img2">
          <img src="../assets/Imagen3.png" alt="Image 3" />
          <div class="hero-overlay">
            <p>New car</p>
          </div>
        </div>
        <div class="img3">
          <img src="../assets/Imagen4.png" alt="Image 4" />
          <div class="hero-overlay">
            <p>Travel</p>
          </div>
        </div>
        <div class="img4">
          <img src="../assets/Imagen5.png" alt="Image 5" />
          <div class="hero-overlay">
            <p>Emergency Fund</p>
          </div>
        </div>
      </div>

      <div class="card-section2">
        <h1>Start building your future today</h1>
        <p>
          Join over 10,000 people who are already taking control of their
          personal finances.
        </p>
        <router-link to="/register" class="btn-creat-account">
          Create a free account
        </router-link>
      </div>
    </section>

    <footer class="footer">
      <!-- Future footer content can be added here -->
    </footer>
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
}

/* Contenedor con el texto y la imagen de la sección hero */
.card-section {
  display: flex;
  gap: 400px;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
}

/* Sección izquierda: Título, descripción y botón de crear cuenta */
.info-secction {
  flex: 0 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  gap: 20px;
  justify-content: center;
  align-items: left;
  text-align: left;
}

/* Título principal de la sección hero */
.info-secction h1 {
  font-size: 48px;
  font-weight: bold;
}

/* Párrafo de descripción en la sección hero */
.info-secction p {
  font-size: 18px;
  line-height: 1.5;
}

/* Botón "Crear una cuenta gratuita" */
.btn-creat-account {
  display: inline-block;
  padding: 12px 30px;
  background-color: #3acf41;
  max-width: 250px;
  color: #000000;
  text-decoration: none;
  font-size: 18px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

/* Efecto hover del botón crear cuenta */
.btn-creat-account:hover {
  background-color: #2e5c31;
  color: #ffffff;
}

/* Sección derecha: Imagen de la sección hero */
.image-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Imagen de la sección hero con borde */
.image-section img {
  max-width: 400px;
  border-radius: 10px;
  border: #3acf41 solid 2px;
}

/* ============================================ */
/* SEGUNDA SECCIÓN (CARACTERÍSTICAS) */
/* ============================================ */

/* Contenedor principal de la segunda sección */
.second-section {
  display: flex;
  padding: 60px 80px;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/* Contenedor para agrupar el título y las tarjetas de características */
.card2-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: left;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
}

/* Sección de información: Título y descripción */
.info2-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: left;
  text-align: left;
}

/* Título de la segunda sección */
.info2-section h1 {
  font-size: 36px;
  font-weight: bold;
}

/* Contenedor de las tres tarjetas de características */
.card-infos {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

/* Tarjetas individuales (Expense Tracking, Investment, Savings) */
.cards {
  background-color: #112218;
  border: 1px solid #2e5c31;
  border-radius: 8px;
  padding: 20px;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Efecto hover de las tarjetas con sombra y movimiento */
.cards:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
  transition: all 0.3s ease;
}

/* Títulos de las tarjetas */
.cards h2 {
  font-size: 24px;
  margin: 15px 0;
  text-align: left;
}

/* Descripción de las tarjetas */
.cards p {
  font-size: 16px;
  line-height: 1.4;
  text-align: left;
}

/* ============================================ */
/* TERCERA SECCIÓN (OBJETIVOS Y LLAMADA FINAL) */
/* ============================================ */

/* Contenedor principal de la tercera sección */
.third-section {
  display: flex;
  flex-direction: column;
  padding: 60px 80px;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #112218;
}

/* Título y descripción de la tercera sección */
.info3-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
}

/* Título de planes financieros */
.info3-section h1 {
  font-size: 36px;
  font-weight: bold;
}

/* Contenedor para las 4 imágenes de objetivos (Casa, Auto, Viaje, Fondo Emergencia) */
.imagenes {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

/* Imágenes individuales de objetivos */
.img1,
.img2,
.img3,
.img4 {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

/* Efecto zoom al pasar el mouse sobre las imágenes */
.img1 img,
.img2 img,
.img3 img,
.img4 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

/* Animación del hover en las imágenes */
.img1:hover img,
.img2:hover img,
.img3:hover img,
.img4:hover img {
  transform: scale(1.05);
}

/* Overlay con la información del objetivo (Own home, New car, etc.) */
.hero-overlay {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
}

/* Tarjeta final de llamada a la acción */
.card-section2 {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #173122;
  padding: 40px;
  border: 1px solid #2e5c31;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Título de la tarjeta final */
.card-section2 h1 {
  font-size: 36px;
  font-weight: bold;
}

/* Descripción de la tarjeta final */
.card-section2 p {
  font-size: 18px;
  line-height: 1.5;
}
</style>
