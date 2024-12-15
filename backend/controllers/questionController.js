import Pregunta from "../models/Question.js";
import mongoose from "mongoose";
import { z } from "zod"; 
import validationPreguntaSchema from "../schemas/questionSchema.js";

// * Obtener todas las preguntas
export const getPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.status(200).json(preguntas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las preguntas", error: error.message });
  }
};

// * Obtener preguntas para un test con un límite
export const getTestPreguntas = async (req, res) => {
  const { limite = 30 } = req.query;

  try {
    const maxPreguntas = await Pregunta.countDocuments(); // Cuenta total de preguntas
    const limiteReal = Math.min(parseInt(limite), maxPreguntas); // Ajusta el límite

    const preguntas = await Pregunta.aggregate([
      { $sample: { size: limiteReal } },
    ]);

    res.status(200).json(preguntas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las preguntas.", error: error.message });
  }
};


// * Crear una nueva pregunta
export const createPregunta = async (req, res) => {
  try {
    // Validar el cuerpo de la solicitud
    const datosValidados = validationPreguntaSchema.parse(req.body);

    // Crear la nueva pregunta
    const nuevaPregunta = new Pregunta(datosValidados);

    const preguntaGuardada = await nuevaPregunta.save();
    res.status(201).json(preguntaGuardada);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Si Zod lanza un error, devolvemos los mensajes de validación
      return res.status(400).json({
        message: "Error de validación.",
        errores: error.errors,
      });
    }
    res.status(500).json({ message: "Error al crear la pregunta.", error: error.message });
  }
};


// * Obtener una pregunta por ID
export const getPreguntaById = async (req, res) => {
  const { id } = req.params;

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

// * Actualizar una pregunta (incluyendo imágenes)
export const updatePregunta = async (req, res) => {
  const { id } = req.params;
  const { texto, tipo_pregunta, alternativas, respuestas_correctas, imagenes } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID inválido." });
  }

  try {
    const preguntaActualizada = await Pregunta.findByIdAndUpdate(
      id,
      { texto, tipo_pregunta, alternativas, respuestas_correctas, imagenes },
      { new: true, runValidators: true }
    );

    if (!preguntaActualizada) {
      return res.status(404).json({ message: "Pregunta no encontrada." });
    }

    res.status(200).json(preguntaActualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la pregunta", error: error.message });
  }
};

// * Eliminar una pregunta
export const deletePregunta = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID inválido." });
  }

  try {
    const pregunta = await Pregunta.findByIdAndDelete(id);
    if (!pregunta) {
      return res.status(404).json({ message: "Pregunta no encontrada." });
    }
    res.status(200).json({ message: "Pregunta eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la pregunta", error: error.message });
  }
};

// * Obtener 35 preguntas aleatorias para el test
export const iniciarTest = async (req, res) => {
  try {
    
    // Seleccionar 35 preguntas aleatorias
    
    const preguntas = await Pregunta.aggregate([
      { $sample: { size: 35 } },
      { $project: {
        texto: 1, 
        tipo_pregunta: 1, 
        alternativas: 1, 
        imagenes: 1, 
        respuestas_correctas: 1, 
        correcion: 1
      } }
    ]);


    res.status(200).json({
      message: "Test generado exitosamente.",
      preguntas,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al generar el test.", error: error.message });
  }
};

// * Validar las respuestas del usuario
export const validarTest = async (req, res) => {
  const { respuestasUsuario } = req.body;

  if (!respuestasUsuario || respuestasUsuario.length === 0) {
    return res.status(400).json({ message: "No se enviaron respuestas para validar." });
  }

  try {
    const preguntas = await Promise.all(
      respuestasUsuario.map(async ({ idPregunta }) => {
        if (!mongoose.Types.ObjectId.isValid(idPregunta)) {
          throw new Error(`ID inválido: ${idPregunta}`);
        }
        const pregunta = await Pregunta.findById(idPregunta);
        if (!pregunta) {
          throw new Error(`Pregunta no encontrada: ${idPregunta}`);
        }
        return pregunta;
      })
    );

    let totalCorrectas = 0;
    let totalIncorrectas = 0;

    const detalleRespuestas = respuestasUsuario.map(({ idPregunta, respuestasSeleccionadas }, index) => {
      const pregunta = preguntas[index];
      const esCorrecta =
        pregunta.respuestas_correctas.length === respuestasSeleccionadas.length &&
        pregunta.respuestas_correctas.every((resp) => respuestasSeleccionadas.includes(resp));

      if (esCorrecta) totalCorrectas++;
      else totalIncorrectas++;

      return {
        idPregunta,
        texto: pregunta.texto,
        esCorrecta,
        respuestasSeleccionadas,
        respuestasCorrectas: pregunta.respuestas_correctas,
      };
    });

    const porcentajeAciertos = ((totalCorrectas / respuestasUsuario.length) * 100).toFixed(2);

    res.status(200).json({
      message: "Resultados del test",
      totalPreguntas: respuestasUsuario.length,
      totalCorrectas,
      totalIncorrectas,
      porcentajeAciertos,
      detalleRespuestas,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al validar el test.", error: error.message });
  }
};