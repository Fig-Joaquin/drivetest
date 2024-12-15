import validationPreguntaSchema from "../schemas/questionSchema.js";

const validatePregunta = (req, res, next) => {
  try {
    console.log("Validando el cuerpo de la solicitud:", req.body); // ! Agrega este log para verificar el cuerpo de la solicitud
    validationPreguntaSchema.parse(req.body); // Valida el cuerpo de la solicitud
    next(); // Si es válido, pasa al siguiente middleware/controlador
  } catch (error) {
    // Manejar errores de validación
    console.log("Errores de validación:", error.errors); // ! Agrega este log para verificar los errores de validación
    res.status(400).json({
      message: "Datos inválidos",
      errors: error.errors.map((err) => err.message), // Zod proporciona un array de errores
    });
  }
};

export default validatePregunta;
