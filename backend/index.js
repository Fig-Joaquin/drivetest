import express from 'express'; // importa express
import dotenv from 'dotenv'; // importa dotenv
import session from "express-session";
import passport from "./config/passportConfig.js"; // Ruta a tu configuración de Passport
import connectDB from './config/db.js'; // importa la conexión a la base de datos
import preguntasRoutes from './routes/questionRoutes.js'; // importa las rutas de preguntas
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";


const app = express(); // crea una instancia con la conexión express
dotenv.config(); // ejecuta dotenv
connectDB(); // ejecuta la conexión a la base de datos

console.log(process.env.MONGO_URI);

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
app.use('/preguntas', preguntasRoutes);
app.use('/auth', authRoutes);
app.use("/usuarios", userRoutes);

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



app.use('/preguntas', preguntasRoutes);

const PORT = process.env.PORT || 4000; // puerto de la aplicación
app.listen(PORT, () => console.log(`Conectado al ${PORT}`));