

const usuariosGet = (req, res) => {
  // podemos desestructurar y pasarle valores por defecto// 
  const { q, name = 'No name', lastname = 'empty', apiKey, page = 1, limit = 1 } = req.query

  res.json({
    msg: "get API- CONTROLLER",
    q, name, apiKey, page, limit, lastname
  });
}

const usuariosPost = (req, res) => {

  const { name, password } = req.body

  // asi parseamos lo que viene en una peticion POST //
  res.json({
    msg: "post API - UsuariosGet",
    name,
    password
  });
}


const usuariosPut = (req, res) => {

  const { id } = req.params



  res.json({
    msg: "put API - UsuariosPut",
    id
  });
}

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API - UsuariosPatch",
  });
}

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API - UsuariosDelete",
  });
}






module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete

}