const { check } = require("express-validator");
const { Router } = require("express");
const { validarCampos, authJWT, isAdminRole } = require("../middlewares");
const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos.controllers");
const { productoValidoporID, categoriaValidaporID } = require("../helpers/db.validators");

const router = Router();

// READ ALL  - obtner todos lo productos  - publico //
router.get("/", obtenerProductos);


// READ ONE -obtener una categoria por id  - publico //
router.get("/:id", [
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(productoValidoporID),
  validarCampos,
], obtenerProducto);


// CREATE -- CREAR UN PRODUCTO
router.post("/", [
  authJWT,
  check("nombre", "El campo NOMBRE es obligatorio").not().isEmpty(),
  check('categoria', 'No es un ID  de mongo valido').isMongoId(),
  check("categoria").custom(categoriaValidaporID),
  validarCampos,
], crearProducto
);

// UPDATE // Actualizar productos //
router.put("/:id", [
  authJWT,
  // check('categoria', 'No es un ID de mongo').isMongoId(),
  check("id").custom(productoValidoporID),
  validarCampos
], actualizarProducto);



// DELETE // ELIMINAR PRODUCTO//
router.delete("/:id", [
  authJWT,
  isAdminRole,
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(productoValidoporID),
  validarCampos

], eliminarProducto);

module.exports = router;
