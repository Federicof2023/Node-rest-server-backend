

const validarCampos = require("../middlewares/verificar-campos");
const authJWT = require("../middlewares/authJWT");
const isAdminRole = require("../middlewares/authRole");
const allowedRoles = require("../middlewares/authRole");
const validarArchivo = require("../middlewares/validar-archivo");

module.exports = {
  ...validarCampos,
  ...authJWT,
  ...isAdminRole,
  ...allowedRoles,
  ...validarArchivo
}