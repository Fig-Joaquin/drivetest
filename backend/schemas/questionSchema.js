import { z } from "zod";

const alternativaSchema = z.object({
  id: z.string().nonempty("Cada alternativa debe tener un ID."),
  texto: z.string().nonempty("El texto de cada alternativa es obligatorio."),
  correccion: z.string().optional(), // Corrección opcional para la alternativa
});

const validationPreguntaSchema = z.object({
  texto: z.string().nonempty("El texto de la pregunta es obligatorio."),
  tipo_pregunta: z.enum(["única", "múltiple"]).refine((val) => !!val, {
    message: "El tipo de pregunta debe ser 'única' o 'múltiple'.",
  }),
  alternativas: z
    .array(alternativaSchema)
    .min(2, "Debe haber al menos 2 alternativas."),
  respuestas_correctas: z
    .array(z.string())
    .min(1, "Debe haber al menos una respuesta correcta."),
  imagenes: z
    .array(
      z.string().regex(
        /^(?:[a-zA-Z]:\\|\/)?(?:[\w-]+\/)*[\w-]+\.(?:png|jpg|jpeg|gif)$/,
        "La ruta de la imagen debe ser válida en el servidor."
      )
    )
    .optional(),
});


export default validationPreguntaSchema;
