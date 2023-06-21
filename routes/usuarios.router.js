const { check } = require("express-validator");
const { Router } = require("express");

// const { validarCampos } = require("../middlewares/verificar-campos"); // importo middleware //
// const { authJWT } = require("../middlewares/authJWT");
// const { isAdminRole, allowedRoles } = require("../middlewares/authRole");

const {
  validarCampos,
  authJWT,
  isAdminRole,
  allowedRoles,
} = require("../middlewares");

const {
  isValidRole,
  emailExiste,
  usuarioValidoPorId,
} = require("../helpers/db.validators");
const {
  usuariosGet,
  usuariosPut,
  usuariosPatch,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios.controllers");

const router = Router();

router.get("/", usuariosGet);

//validaciones en el PUT
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(usuarioValidoPorId),
    check("role").custom(isValidRole),
    validarCampos,
  ],
  usuariosPut
);

// validaciones en el POST//
router.post(
  "/",
  [
    check("nombre", "El campo NOMBRE es obligatorio").not().isEmpty(),
    check("correo", "El correo NO es valido").isEmail(),
    check(
      "password",
      "El password es obligatorio y debe contener minimo 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo").custom(emailExiste),
    // body("role", "Ese role no corresponde o no es valido").isIn(["ADMIN_ROLE","USER_ROLE"]),
    check("role").custom(isValidRole),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    authJWT, // <- validamos las rutas con el middleweare
    // isAdminRole,               // <- validamos con  este middleware el ROLE del usuario si ADMIN//
    allowedRoles("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(usuarioValidoPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
