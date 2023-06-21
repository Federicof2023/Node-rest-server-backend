const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El campo nombre es obligatorio"],
    },
    correo: {
      type: String,
      required: [true, "El campo correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "El password es obligatorio"],
    },
    imagen: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      emun: ["ADMIN_ROLE", "USER_ROLE"],
    },
    estado: {
      type: Boolean,
      default: true
    },
    google: {
      type: Boolean,
      default: false,
    },
  },

);

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject()
  usuario.uid = _id
  return usuario
}







module.exports = mongoose.model("Usuario", UsuarioSchema);
