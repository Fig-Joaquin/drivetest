import express from 'express';
import {
  getPreguntas,
  createPregunta,
  getPreguntaById,
  deletePregunta,
  getTestPreguntas,
  iniciarTest,
  validarTest,
  getPreguntasSinCorreccion,
  updateCorreccionAlternativa,
} from '../controllers/questionController.js';
import validatePregunta from '../middlewares/validateQuestion.js';

const router = express.Router();

// Rutas para CRUD de preguntas
router.get('/', getPreguntas); // Obtener todas las preguntas
router.get('/test', getTestPreguntas); // Obtener preguntas para un test
router.post('/', validatePregunta, createPregunta); // Crear una nueva pregunta
router.get('/:id', getPreguntaById); // Obtener pregunta por ID
router.delete('/:id', deletePregunta); // Eliminar una pregunta por ID
router.get('/obtener/correcion', getPreguntasSinCorreccion); // Obtener preguntas sin corrección
router.patch('/actualizar/correcion', updateCorreccionAlternativa); // Actualizar corrección de una pregunta


// Rutas para manejo de tests
router.get('/tests/iniciar', iniciarTest); // Generar un test aleatorio
router.post('/tests/validar', validarTest); // Validar respuestas de un test

export default router;
