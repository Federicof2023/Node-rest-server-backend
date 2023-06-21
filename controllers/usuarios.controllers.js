const { validationResult } = require("express-validator");
const Usuario = require("../models/usuarios.model");
const bcrypt = require("bcrypt");

// GET ALL - READ ALL -- CON PAGINACION DE USUARIOS---

const usuariosGet = async (req, res) => {
  //  defino un paginado en la url , le dejo un valor por default
  const { limit = 15, from = 0 } = req.query;

  const query = { estado: true }; // defino valor por default del estado en true//

  const [total_Usuarios, usuarios] = await Promise.all([
    Usuario.countDocuments(query), // me traigo cantidad de registros usuarios total en mi BD //
    Usuario.find(query)
      .skip(from) // defino desde que  registro quiero que me muestre los registros  //
      .limit(limit), // limito cantidad de registros que me quiero traer  //
  ]);

  res.json({
    total_Usuarios,
    usuarios,
  });
};
// CREATE //
const usuariosPost = async (req, res) => {
  // asi parseamos lo que viene en una peticion POST //
  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, correo, password, role });

  // encriptar el password //
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  // guardo en la bd //
  await usuario.save();

  res.json({
    usuario,
  });
};

//UPDATE //
const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...rest } = req.body;

  if (password) {
    // encriptar el password //
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, rest);

  res.json(usuario); // quite el id ya no hace falta, pero si crashea ponerlo devuelta ({id,usuario})
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API - UsuariosPatch",
  });
};
// DELETE //
const usuariosDelete = async (req, res) => {

  const { id } = req.params



  // elimnino usuario , me traigo el usuario eliminado y el usuario autenticado //
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
  // const usuarioAutenticado = req.usuario


  // res.json({ usuario, usuarioAutenticado }); // ya no hay que ponerlo pero me trae el user autenticado
  res.json(usuario);

};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
};
