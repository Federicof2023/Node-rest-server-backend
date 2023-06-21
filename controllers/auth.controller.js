
const Usuario = require("../models/usuarios.model");
const bcrypt = require('bcrypt')
const { generarJWT } = require('../helpers/generate-JWT');





const login = async (req, res = response) => {

  const { correo, password } = req.body;

  try {

    // verifico si existe usuario , si  existe el email // 

    const usuario = await Usuario.findOne({ correo }) // lo busco ...
    if (!usuario) {
      return res.status(400).json({
        msg: "User or password not found -[EMAIL]"
      })
    }

    // Si el usuario esta activo ,osea no este en false que no lo borraron//

    if (!usuario.estado) {
      return res.status(400).json(
        { msg: "User or password not found -[USER:false]" })
    }

    // verifico  el password //

    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json(
        { msg: "User/ password not found -[PASSWORD:false]" })
    }


    // generar el JWT //


    const token = await generarJWT(usuario.id)

    res.json({
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error inesperado contacte a su administrador"
    });
  }
}

module.exports = { login };
