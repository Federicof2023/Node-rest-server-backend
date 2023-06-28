const { check } = require("express-validator");
const { Router } = require("express");


const { login, googleSignIn } = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/verificar-campos");

const router = Router();

// defino la ruta post al login // 
router.post("/login", [
  check("correo", "El campo correo es obligatorio").isEmail(),
  check("password", "El password es obligatorio y debe contener minimo 8 caracteres")
    .not().isEmpty().isLength({ min: 8 }),
  validarCampos
], login);

router.post("/google", [
  check("id_token", "El token de google es requerido").not().isEmpty(),
  validarCampos
], googleSignIn);







module.exports = router;
