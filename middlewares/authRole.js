

const isAdminRole = (req, res, next) => {

  // verificacion interna para el back // 
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Asegurate de validar PRIMERO el TOKEN  antes que el ROLE [errror⚠ ]"
    })
  }

  // validacion  para que solo el ADMIN pueda eliminar usuarios // 
  const { role, nombre } = req.usuario

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `El ${nombre} no es ADMINISTRADOR, accion no permitida- [ACCION NO VALIDA]`
    })
  }

  next()

}
const allowedRoles = (...roles) => {
  return (req, res, next) => {


    if (!req.usuario) {
      return res.status(500).json({
        msg: "Asegurate de validar PRIMERO el TOKEN  antes que el ROLE [errror⚠ ]"
      })
    }


    if (!roles.includes(req.usuario.role)) {
      return res.status(401).json({
        msg: `Para esta accion se requieren alguno de estos roles ${roles}`
      })
    }
    next()

  }

}




module.exports = { isAdminRole, allowedRoles }












