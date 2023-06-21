const { mongoose } = require("mongoose");

const RoleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "El campo role es obligatorio"],
  },
});

module.exports = mongoose.model("Role", RoleSchema);
