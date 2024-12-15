import mongoose from "mongoose";

// Subdocumento para alternativas
const alternativaSchema = new mongoose.Schema({
  id: { type: String, required: true }, // ID único para identificar la alternativa
  texto: { type: String, required: true }, // Texto de la alternativa
  correccion: { type: String, required: false }, // Explicación opcional sobre la corrección
});

// Documento principal para preguntas
const preguntaSchema = new mongoose.Schema({
  texto: { type: String, required: true }, // Texto de la pregunta
  tipo_pregunta: { 
    type: String, 
    enum: ['única', 'múltiple'], 
    required: true // Define si es una pregunta con una o varias respuestas correctas
  },
  alternativas: [alternativaSchema], // Array de alternativas
  respuestas_correctas: [{ type: String, required: true }] // IDs de las alternativas correctas
});

const Pregunta = mongoose.model("Pregunta", preguntaSchema);
export default Pregunta;