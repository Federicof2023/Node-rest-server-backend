const { mongoose, Schema } = require("mongoose");


const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre role es obligatorio"],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()

  return data
}


module.exports = mongoose.model("Categoria", CategoriaSchema);
