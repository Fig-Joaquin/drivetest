import Pregunta from "../models/Question.js";
import mongoose from "mongoose";

// Obtener todas las preguntas
export const getPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.status(200).json(preguntas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las preguntas", error: error.message });
  }
};
// Función para obtener las preguntas con limite de 30 (por defecto)
export const getTestPreguntas = async (req, res) => {
  const { limite = 30 } = req.query; // Permitir establecer un límite de preguntas en la consulta

  try {
    const preguntas = await Pregunta.aggregate([
      { $sample: { size: parseInt(limite) } } // Selecciona un número aleatorio de preguntas
    ]);
    res.status(200).json(preguntas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las preguntas", error: error.message });
  }
};

// Crear una nueva pregunta
export const createPregunta = async (req, res) => {
  const { texto, tipo_pregunta, alternativas, respuestas_correctas } = req.body;

  // Validar que las alternativas sean únicas
  const idsAlternativas = alternativas.map((alt) => alt.id);
  const idsUnicos = new Set(idsAlternativas);
  if (idsAlternativas.length !== idsUnicos.size) {
    return res.status(400).json({ message: "Los IDs de las alternativas deben ser únicos." });
  }

  // Validar que las respuestas_correctas correspondan a alternativas válidas
  const idsAlternativasSet = new Set(idsAlternativas);
  const respuestasValidas = respuestas_correctas.every((resp) => idsAlternativasSet.has(resp));
  if (!respuestasValidas) {
    return res.status(400).json({ message: "Las respuestas_correctas deben coincidir con IDs de alternativas." });
  }

  const nuevaPregunta = new Pregunta({ texto, tipo_pregunta, alternativas, respuestas_correctas });

  try {
    const preguntaGuardada = await nuevaPregunta.save();
    res.status(201).json(preguntaGuardada);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la pregunta", error: error.message });
  }
};

// Obtener una pregunta por ID
export const getPreguntaById = async (req, res) => {
  const { id } = req.params;

  // Validar el formato del ID (si es ObjectId)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID inválido." });
  }

  try {
    const pregunta = await Pregunta.findById(id);
    if (!pregunta) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }
    res.status(200).json(pregunta);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la pregunta", error: error.message });
  }
};

// Eliminar una pregunta por ID
export const deletePregunta = async (req, res) => {
  const { id } = req.params;

  // Validar el formato del ID (si es ObjectId)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID inválido." });
  }

  try {
    const pregunta = await Pregunta.findByIdAndDelete(id);
    if (!pregunta) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }
    res.status(200).json({ message: "Pregunta eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la pregunta", error: error.message });
  }
};

export const putCorrecion = async (req, res) => {
  const { idPregunta, idAlternativa } = req.params; // IDs de la pregunta y la alternativa
  const { correccion } = req.body; // Nueva corrección

  try {
    // Validar que la corrección no sea vacía
    if (!correccion) {
      return res.status(400).json({ message: "La corrección es obligatoria." });
    }

    // Buscar la pregunta por ID
    const pregunta = await Pregunta.findById(idPregunta);
    if (!pregunta) {
      return res.status(404).json({ message: "Pregunta no encontrada." });
    }

    // Buscar la alternativa por ID dentro de la pregunta
    const alternativa = pregunta.alternativas.find((alt) => alt.id === idAlternativa);
    if (!alternativa) {
      return res.status(404).json({ message: "Alternativa no encontrada." });
    }

    // Actualizar la corrección de la alternativa
    alternativa.correccion = correccion;

    // Guardar los cambios en la base de datos
    await pregunta.save();

    res.status(200).json({
      message: "Corrección actualizada exitosamente.",
      alternativaActualizada: alternativa,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la corrección.", error: error.message });
  }
};

// Validar respuestas del usuario
export const ValidateAnswers = async (req, res) => {
  const { respuestasUsuario } = req.body; // [{ idPregunta, respuestaSeleccionada }, ...]

  try {
    let respuestasIncorrectas = 0;

    for (const respuesta of respuestasUsuario) {
      const { idPregunta, respuestaSeleccionada } = respuesta;

      // Validar el formato del ID
      if (!mongoose.Types.ObjectId.isValid(idPregunta)) {
        return res.status(400).json({ message: "ID de pregunta inválido." });
      }

      // Obtener la pregunta de la base de datos
      const pregunta = await Pregunta.findById(idPregunta);

      if (!pregunta) {
        return res.status(404).json({ message: `Pregunta con ID ${idPregunta} no encontrada.` });
      }

      // Verificar si la respuesta es correcta
      const esCorrecta = pregunta.respuestas_correctas.includes(respuestaSeleccionada);

      if (!esCorrecta) {
        respuestasIncorrectas++;
      }
    }

    res.status(200).json({
      message: "Evaluación completada.",
      totalPreguntas: respuestasUsuario.length,
      respuestasIncorrectas,
      respuestasCorrectas: respuestasUsuario.length - respuestasIncorrectas,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al validar las respuestas.", error: error.message });
  }
};
