import express from 'express';
import { getPreguntas, createPregunta, getPreguntaById, deletePregunta, getTestPreguntas, putCorrecion } from '../controllers/questionController.js';
import validatePregunta from '../middlewares/validateQuestion.js'; 
const router = express.Router();

router.get('/', getPreguntas); // Obtener todas las preguntas
router.get('/test',getTestPreguntas); // Obtener preguntas para un test
router.post('/', validatePregunta, createPregunta); // Crear una nueva pregunta
router.get('/:id', getPreguntaById); // Obtener pregunta por ID
router.delete('/:id', deletePregunta); // Eliminar una pregunta por ID
router.patch('/:idPregunta/alternativas/:idAlternativa/correcion', putCorrecion); // Agregar corrección a una pregunta
export default router;
