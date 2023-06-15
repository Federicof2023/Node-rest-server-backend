const { Router } = require("express"); // importo express
const {
  usuariosGet,
  usuariosPut,
  usuariosPatch,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios.controllers");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post("/", usuariosPost);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
