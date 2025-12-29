# 📊 Documentación - Finances Pro

## 📋 Índice

1. [Descripción General](#descripción-general)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Backend](#backend)
5. [Frontend](#frontend)
6. [Base de Datos](#base-de-datos)
7. [Docker y Deployment](#docker-y-deployment)
8. [Cambios Realizados](#cambios-realizados)
9. [Instalación y Ejecución](#instalación-y-ejecución)

---

## 🎯 Descripción General

**Finances Pro** es una aplicación web de gestión financiera personal que permite a los usuarios:

- Crear cuentas y registrarse
- Iniciar sesión de forma segura
- Rastrear gastos
- Establecer metas financieras
- Visualizar estadísticas de ahorros

**Stack Tecnológico:**

- **Frontend:** Vue 3 + Vite
- **Backend:** Node.js + Express
- **Base de Datos:** MySQL 8.0
- **Containerización:** Docker + Docker Compose

---

## 🏗️ Arquitectura del Proyecto

```
Finances/
├── backend/              # API REST en Node.js/Express
├── frontend/             # Aplicación Vue 3 con Vite
├── docker-compose.yml    # Orquestación de servicios
└── DOCUMENTACION.md      # Este archivo
```

### Flujo de Datos

```
Usuario (Navegador)
    ↓
Frontend (Vue 3 - Puerto 5173)
    ↓
Backend API (Express - Puerto 3000)
    ↓
Base de Datos MySQL (Puerto 3309)
```

---

## 📁 Estructura de Carpetas

### Backend

```
backend/
├── .env                 # Variables de entorno
├── .gitignore
├── package.json         # Dependencias del backend
├── Dockerfile
├── src/
│   ├── app.js          # Punto de entrada de la aplicación
│   └── config/
│       └── db.js       # Configuración de la base de datos
```

### Frontend

```
frontend/
├── .env                 # Variables de entorno
├── .gitignore
├── package.json         # Dependencias del frontend
├── vite.config.js       # Configuración de Vite
├── index.html
├── Dockerfile
├── README.md
├── public/              # Archivos estáticos públicos
├── src/
│   ├── main.js         # Punto de entrada de Vue
│   ├── App.vue         # Componente raíz
│   ├── assets/         # Imágenes, logos, etc.
│   ├── components/     # Componentes Vue reutilizables
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── Register.vue    # ✅ RECIENTEMENTE MEJORADO
│   │   ├── Features.vue
│   │   ├── About.vue
│   │   └── Prices.vue
│   └── router/
│       └── index.js    # Configuración de rutas
```

---

## 🔧 Backend

### Tecnologías Utilizadas

| Paquete      | Versión | Propósito                        |
| ------------ | ------- | -------------------------------- |
| express      | ^4.18.2 | Framework web                    |
| mysql2       | ^3.6.0  | Driver MySQL                     |
| bcryptjs     | ^3.0.3  | Hash de contraseñas              |
| jsonwebtoken | ^9.0.2  | Autenticación JWT                |
| cors         | ^2.8.5  | Permitir solicitudes CORS        |
| dotenv       | ^16.0.3 | Variables de entorno             |
| multer       | ^2.0.2  | Subida de archivos               |
| nodemon      | ^3.1.0  | Recarga automática en desarrollo |

### Endpoints Implementados

#### 1. Registro de Usuarios

- **Método:** `POST`
- **Ruta:** `/api/register`
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Respuestas:**
  - `201 Created`: Usuario registrado exitosamente
  - `400 Bad Request`: Campos obligatorios vacíos
  - `409 Conflict`: El usuario ya existe
  - `500 Internal Server Error`: Error en el servidor

**Seguridad:**

- Validación de campos requeridos
- Verificación de duplicados por email
- Contraseña hasheada con bcryptjs (10 rounds)

### Configuración de Base de Datos

Archivo: `src/config/db.js`

- Conexión a MySQL usando mysql2
- Pool de conexiones para mejor rendimiento
- Variables de entorno para credenciales

---

## 🎨 Frontend

### Tecnologías Utilizadas

| Paquete    | Versión | Propósito            |
| ---------- | ------- | -------------------- |
| vue        | ^3.5.24 | Framework de UI      |
| vue-router | ^4.6.4  | Enrutamiento         |
| axios      | ^1.13.2 | Cliente HTTP         |
| vite       | ^7.2.4  | Bundler y dev server |

### Rutas Disponibles

| Ruta        | Componente   | Descripción               |
| ----------- | ------------ | ------------------------- |
| `/`         | Home.vue     | Página principal          |
| `/login`    | Login.vue    | Inicio de sesión          |
| `/register` | Register.vue | Registro de usuarios      |
| `/features` | Features.vue | Características de la app |
| `/about`    | About.vue    | Información de la empresa |
| `/prices`   | Prices.vue   | Planes de precios         |

### Componente: Register.vue

**Estado Actual:** ✅ Optimizado y mejorado

#### Características:

- ✅ Layout responsive de dos columnas
- ✅ Lado izquierdo: Imagen con overlay profesional
- ✅ Lado derecho: Formulario de registro
- ✅ Diseño moderno con degradados verdes

#### Estilos Aplicados:

**Lado Izquierdo:**

- Ancho fijo: 50%
- Fondo: Gradiente verde `linear-gradient(135deg, #0d3b1f 0%, #1a5c3a 50%, #0d3b1f 100%)`
- Imagen con opacidad: 0.5
- Overlay profesional: Gradiente oscuro de izquierda a derecha
- Texto con sombras para mejor legibilidad

**Lado Derecho:**

- Ancho flexible: 50% + espacio disponible
- Fondo: Blanco (#ffffff)
- Contiene el formulario de registro

**Header:**

- Altura: 60px
- Fondo oscuro: #112218
- Logo y botón Login
- Borde inferior verde: #2e5c31

#### Estructura del Formulario:

```html
<form>
  - Campo Username (texto) - Campo Email (correo) - Campo Password (contraseña)
  - Campo Confirm Password (confirmación) - Checkbox Términos y Condiciones -
  Botón Register (verde con hover effect) - Texto de seguridad
</form>
```

#### Paleta de Colores:

| Color            | Código  | Uso                    |
| ---------------- | ------- | ---------------------- |
| Verde Oscuro     | #0d3b1f | Fondo izquierdo        |
| Verde Medio      | #1a5c3a | Gradiente              |
| Verde Claro      | #3acf41 | Botón hover            |
| Verde Secundario | #2e5c31 | Header border, botones |
| Blanco           | #ffffff | Texto, fondo derecho   |
| Negro            | #000000 | Texto hover            |

---

## 💾 Base de Datos

### Configuración MySQL

- **Imagen:** mysql:8.0
- **Base de Datos:** FinanceDB
- **Usuario Root:** **\***
- **Contraseña:** **\***
- **Puerto Interno:** 3306
- **Puerto Externo:** 3309

### Tabla: users

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento en búsquedas
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_username ON users(username);
```

---

## 🐳 Docker y Deployment

### Docker Compose Services

#### 1. **backend_service**

```yaml
- Puerto: 3000:3000
- Comando: npm run dev (nodemon)
- Dependencias: db_service
- Volúmenes: Código en desarrollo
```

#### 2. **frontend_service**

```yaml
- Puerto: 5173:5173
- Comando: npm run dev -- --host
- Dependencias: backend_service
- Volúmenes: Código en desarrollo
```

#### 3. **db_service** (MySQL)

```yaml
- Puerto: 3309:3306
- Volumen Persistente: db_data
- Contraseña Root: cam2190lol
```

### Comandos Docker

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir imágenes
docker-compose build
```

---

## 📝 Cambios Realizados

### Mejoras al Componente Register.vue

#### 1️⃣ **Estructura HTML** (Primera fase)

- ✅ Agregado contenedor `content-wrapper` que envuelve `left-side` y `right-side`
- ✅ Mejor jerarquía visual de dos columnas

#### 2️⃣ **Estilos CSS - Responsive** (Segunda fase)

- ✅ Left-side: 50% de ancho fijo
- ✅ Right-side: Flexible para llenar espacio restante
- ✅ Uso de flexbox para alineación perfecta
- ✅ Height calculado: `calc(100vh - 60px)` (resta altura del header)

#### 3️⃣ **Imagen y Fondo** (Tercera fase)

- ✅ Removido `background-attachment: fixed` (causa problemas al redimensionar)
- ✅ Cambio de opacidad: 0.3 → 0.5 (más visible)
- ✅ Agregado `object-fit: cover` para escalado responsivo
- ✅ `object-position: center` para mantener foco central

#### 4️⃣ **Diseño Profesional** (Cuarta fase)

- ✅ Gradiente verde oscuro: `linear-gradient(135deg, #0d3b1f 0%, #1a5c3a 50%, #0d3b1f 100%)`
- ✅ Overlay oscuro con gradiente: `rgba(13, 59, 31, 0.8 → 0.2)`
- ✅ Sombras de texto para mejor legibilidad
- ✅ Mejor peso de fuente y espaciado

#### 5️⃣ **Tipografía y UX**

- ✅ H2: font-size 48px, font-weight 700, line-height 1.2
- ✅ P: font-size 18px, line-height 1.6, opacity 0.95
- ✅ Text-shadows para contraste
- ✅ Padding de 40px 60px en overlay

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

- Docker Desktop instalado
- Docker Compose instalado
- Git instalado

### Pasos de Instalación

#### 1. Clonar o Preparar el Proyecto

```bash
cd c:\Users\COMPUMAX\Desktop\Finances
```

#### 2. Configurar Variables de Entorno

**Backend (.env)**

```
DB_HOST=*****
DB_USER=*****
DB_PASSWORD=*****
DB_NAME= FinanceDB
DB_PORT=3306
PORT=3000
NODE_ENV=development
```

**Frontend (.env)**

```
VITE_API_URL=http://localhost:3000/api
```

#### 3. Ejecutar con Docker

```bash
# En la raíz del proyecto
docker-compose up -d

# Verificar servicios
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f
```

#### 4. Acceder a la Aplicación

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000
- **Adminer (opcional):** Agregar servicio para gestionar BD

#### 5. Detener la Aplicación

```bash
docker-compose down
```

---

## 📊 Estado Actual del Proyecto

### ✅ Completado

- [x] Estructura del proyecto con Docker
- [x] Backend Express con endpoint de registro
- [x] Base de datos MySQL configurada
- [x] Frontend Vue 3 con Vite
- [x] Componente Register mejorado y profesional
- [x] Rutas de navegación
- [x] Sistema de seguridad básico (bcryptjs)

### ⏳ Por Hacer

- [ ] Endpoint de Login con JWT
- [ ] Validación de formularios en frontend
- [ ] Componentes Login, Home, Features, About, Prices
- [ ] Gestión de presupuestos y gastos
- [ ] Gráficas y estadísticas
- [ ] Recuperación de contraseña
- [ ] Editar perfil de usuario
- [ ] Tests unitarios
- [ ] Documentación API (Swagger)

---

## 🔒 Seguridad

### Implementado

- ✅ Contraseñas hasheadas con bcryptjs (10 rounds)
- ✅ CORS habilitado
- ✅ Validación de campos requeridos
- ✅ Verificación de duplicados

### Recomendaciones Futuras

- [ ] Implementar JWT para autenticación
- [ ] Validación de email
- [ ] Rate limiting
- [ ] Encriptación de datos sensibles
- [ ] HTTPS en producción
- [ ] Validación en frontend y backend

---

## 📞 Soporte y Contacto

Para preguntas o problemas:

1. Revisar logs con: `docker-compose logs -f [servicio]`
2. Verificar que los puertos no estén en uso
3. Asegurar que MySQL está corriendo: `docker-compose ps`

---

**Última actualización:** 28 de Diciembre, 2025
**Versión:** 1.0.0
