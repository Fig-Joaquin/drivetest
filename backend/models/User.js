import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Esto permite usuarios que no usen Google para autenticarse
  },
  nombre: {
    type: String,
    required: function () { return !this.googleId; }, // Obligatorio para usuarios no autenticados por Google
  },
  apellido: {
    type: String,
    required: function () { return !this.googleId; },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () { return !this.googleId; },
  },
});

export default mongoose.model("User", userSchema);
