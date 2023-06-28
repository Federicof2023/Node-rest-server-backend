
const Usuario = require("../models/usuarios.model");
const bcrypt = require('bcrypt')
const { generarJWT } = require('../helpers/generate-JWT');
const { googleVerify } = require("../helpers/google-verify");





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



const googleSignIn = async (req, res) => {

  const { id_token } = req.body

  try {
    //--validaciones --//
    // aca recibo el usuario de google

    const { nombre, correo, img } = await googleVerify(id_token)

    let usuario = await Usuario.findOne({ correo })

    // si el usuario no existe  creo el nuevo usuario //
    if (!usuario) {

      const data = {
        nombre,
        correo,
        password: ':p',
        img,
        role,
        google: true

      }
      usuario = new Usuario(data)
      await usuario.save() // y despues lo guardo en la DB // 
    }

    // si es un usuario que fue eliminado ya de la DB//
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Usuario bloqueado,contacte a su administrator"
      })
    }

    // generar JWT // 

    const token = await generarJWT(usuario.id)


    res.json({
      usuario,
      token
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "El token no se pudo verificar "
    })

  }






}

module.exports = {
  login,
  googleSignIn
};
