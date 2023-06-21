const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuarios.model")


const authJWT = async (req, res, next) => {

  const token = req.header('Authorization');

  // valido si me llega un token  por los headers // 
  if (!token) {
    return res.status(401).json({ msg: "No existe ningun token [TOKEN] " })
  }

  try {

    // verifico si el jwt es valido // 
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)

    // leo el usuario que corresponda al uid 
    const usuario = await Usuario.findById(uid)

    // verifico que exista un usuario por si no encuentra a nadie por id [undefined]//
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no existe  [USUARIO:eliminado de DB ]"
      })

    }

    // validacion para cuando ya se elimino un usuario, que ese token ya no sea valido[estado del uid]//
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Este token ya no es valido [ESTADO:false]"
      })
    }


    req.usuario = usuario
    next()



  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no valido" })
  }



}





module.exports = { authJWT }