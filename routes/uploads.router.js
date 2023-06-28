const { check } = require("express-validator");
const { Router } = require("express");

const { validarCampos, validarArchivo } = require("../middlewares");
const {
  uploadFiles,
  updateFile,
  mostrarArchivo,
  updateCloudinaryFile,
} = require("../controllers/uploads.controllers");

const { coleccionesValidas } = require("../helpers");

const router = Router();

// ruta subir archivos //
router.post("/", validarArchivo, uploadFiles);

// ruta actualizar archivos //
router.put("/:coleccion/:id",
  [
    validarArchivo,
    check("id", "El id no es un id de mongo valido").isMongoId(),
    check("coleccion").custom((colec) =>
      coleccionesValidas(colec, ["usuarios", "productos"])
    ), validarCampos,
  ], updateCloudinaryFile
);









router.get("/:coleccion/:id", [

  check("id", "El id no es un id de mongo valido").isMongoId(),
  check("coleccion").custom((colec) => coleccionesValidas(colec, ["usuarios", "productos"])
  ), validarCampos,
], mostrarArchivo
);

module.exports = router;
