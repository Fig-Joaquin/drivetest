import express from 'express'; // importa express
import dotenv from 'dotenv'; // importa dotenv
import session from "express-session";
import passport from "./config/passportConfig.js"; // Ruta a tu configuración de Passport
import connectDB from './config/db.js'; // importa la conexión a la base de datos
import preguntasRoutes from './routes/questionRoutes.js'; // importa las rutas de preguntas
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors'; // Importa cors
import path from "path";
import { fileURLToPath } from "url";


const app = express(); // crea una instancia con la conexión express
dotenv.config(); // ejecuta dotenv
connectDB(); // ejecuta la conexión a la base de datos

console.log(process.env.MONGO_URI);


// Middleware para habilitar CORS
app.use(cors({
  origin: `${process.env.WEB_URL}:5173`, // Cambia esto al origen de tu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware para sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mi_secreto_super_seguro',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());

// Rutas
app.use('/api', preguntasRoutes);
app.use('/auth', authRoutes);
app.use("/usuarios", userRoutes);

// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
  });
});

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());


// const PORT = process.env.PORT || 4000; // puerto de la aplicación
// app.listen(PORT, () => console.log(`Conectado al ${PORT}`));

// Cambia `localhost` por `0.0.0.0` o la IP local
const PORT = 4000; // Cambia al puerto que usas
app.listen(PORT, process.env.WEB_URL, () => {
  console.log(`Servidor corriendo en http://192.168.x.x:${PORT}`);
});