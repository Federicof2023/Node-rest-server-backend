const { check } = require("express-validator");
const { Router } = require("express");


const { login } = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/verificar-campos");

const router = Router();

router.post("/login", [
  check("correo", "El campo correo es obligatorio").isEmail(),
  check("password", "El password es obligatorio y debe contener minimo 8 caracteres")
    .not().isEmpty().isLength({ min: 8 }),
  validarCampos



], login); // defino la ruta post al login // 






module.exports = router;
