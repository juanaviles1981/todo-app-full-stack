📝 TodoApp FullStack

Una aplicación de lista de tareas (ToDo) completa construida con React para el frontend y Express + MongoDB para el backend.

🚀 Características
Frontend Moderno: Interfaz responsive construida con React y Tailwind CSS

Backend Robust: API RESTful con Express.js

Base de Datos: MongoDB Atlas para almacenamiento persistente

Operaciones CRUD:

Crear nuevas tareas

Leer/ver todas las tareas

Actualizar estado de completado

Eliminar tareas

Efectos Visuales: Transiciones suaves y diseño atractivo

Optimistic UI: Actualización inmediata de la interfaz con fallback al estado anterior si hay errores

🛠 Tecnologías Utilizadas
Frontend
React.js

Tailwind CSS

Vite (asumido por la estructura del proyecto)

Axios (para llamadas API)

Backend
Node.js

Express.js

MongoDB (con Mongoose)

CORS (para manejar solicitudes entre dominios)

dotenv (para variables de entorno)

📦 Instalación
Requisitos Previos
Node.js (v14 o superior)

npm o yarn

MongoDB Atlas (o local)

Pasos para Instalar
Clonar el repositorio:

bash
git clone https://github.com/tu-usuario/TodoApp-fullStack.git
cd TodoApp-fullStack
Instalar dependencias del backend:

bash
cd backend
npm install
Instalar dependencias del frontend:

bash
cd ../frontend
npm install
Configurar variables de entorno:

Crear un archivo .env en la raíz del backend con:

text
MONGO_URI=tu_cadena_de_conexion_mongodb
PORT=5000
🏃 Ejecución
Backend
bash
cd backend
npm start
Frontend
bash
cd frontend
npm run dev
La aplicación estará disponible en http://localhost:5173 (o el puerto que configure Vite).

🌐 Despliegue
La aplicación está configurada para desplegarse fácilmente en servicios como:

Render (como en el ejemplo)

Vercel (frontend)

Heroku (backend)

MongoDB Atlas (base de datos)

🤝 Contribución
Las contribuciones son bienvenidas. Sigue estos pasos:

Haz un fork del proyecto

Crea una rama para tu feature (git checkout -b feature/AmazingFeature)

Haz commit de tus cambios (git commit -m 'Add some AmazingFeature')

Haz push a la rama (git push origin feature/AmazingFeature)

Abre un Pull Request

📄 Licencia
Distribuido bajo la licencia MIT. Ver LICENSE para más información.

✉️ Contacto
juanavilesdev@gmail.com
