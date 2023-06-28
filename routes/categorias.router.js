const { check } = require("express-validator");
const { Router } = require("express");
const { validarCampos, authJWT, isAdminRole } = require("../middlewares");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categorias.controllers");
const { categoriaValidaporID } = require("../helpers/db.validators");

const router = Router();

// -------------------CATEGORIAS --------------- //

// READ ALL   leer  todas las categorias -- servicio publico //
router.get("/", obtenerCategorias);

// READ ONE   obtener una  categoria por id -- servicio publico //
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(categoriaValidaporID),
    validarCampos,
  ],
  obtenerCategoria
);

// CREATE   crear una  categoria -- privado -- cualquier persona con un token valido //
router.post("/",
  [
    authJWT,
    check("nombre", "El campo NOMBRE es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// UPDATE     --privado     cualquier persona con token valido  //
router.put("/:id", [
  authJWT,
  check("nombre", "El campo NOMBRE es obligatorio").not().isEmpty(),
  check("id").custom(categoriaValidaporID),
  validarCampos
], actualizarCategoria);


// DELETE    -- Solo elimina si es ADMIN  //
router.delete("/:id", [
  authJWT,
  isAdminRole,
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(categoriaValidaporID),
  validarCampos
], eliminarCategoria);

module.exports = router;
