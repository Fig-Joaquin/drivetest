import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relación con el usuario
  preguntas: [
    {
      pregunta: { type: mongoose.Schema.Types.ObjectId, ref: "Pregunta", required: true },
      alternativasSeleccionadas: [{ type: String }], // IDs de las alternativas seleccionadas
      correctas: [{ type: String }], // IDs de las respuestas correctas
      esCorrecta: { type: Boolean, required: true },
    },
  ],
  puntaje: { type: Number, required: true },
  duracion: { type: Number }, // En segundos
  totalPreguntas: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model("Exam", examSchema);
