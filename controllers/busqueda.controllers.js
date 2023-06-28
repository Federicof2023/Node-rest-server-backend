const { ObjectId } = require('mongoose').Types
const { Usuario, Categoria, Producto } = require('../models')



const colecciones = [
  'usuarios',
  'categorias',
  'productos',
  'roles'
]


const busquedaUsuarios = async (palabra = '', res) => {
  const isMongoId = ObjectId.isValid(palabra)


  if (isMongoId) {
    const usuario = await Usuario.findById(palabra)
    return res.json({
      results: (usuario) ? [usuario] : []
    })
  }

  // expresion regular para busqueda insensitive //
  const regex = new RegExp(palabra, 'i')

  // busqueda de usuarios  por nombre o correo //
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }] //<-  y ... solo usuarios en estado true//
  })
  res.json({
    results: usuarios
  })
}

const busquedaCategorias = async (palabra = '', res) => {

  const isMongoId = ObjectId.isValid(palabra)


  if (isMongoId) {
    const categoria = await Categoria.findById(palabra)
    return res.json({
      results: (categoria) ? [categoria] : []
    })
  }

  // expresion regular para busqueda insensitive //
  const regex = new RegExp(palabra, 'i')

  // busqueda de usuarios  por nombre o correo //
  const categorias = await Categoria.find({ nombre: regex, estado: true })
  res.json({
    results: categorias
  })

}

const busquedaProductos = async (palabra = '', res) => {


  const isMongoId = ObjectId.isValid(palabra)


  if (isMongoId) {
    const producto = await Producto.findById(palabra).populate('categoria', 'nombre')
    return res.json({
      results: (producto) ? [producto] : []
    })
  }

  // expresion regular para busqueda insensitive //
  const regex = new RegExp(palabra, 'i')

  // busqueda de productos  por nombre o correo //
  const productos = await Producto.find({ nombre: regex, estado: true })
    .populate('categoria', 'nombre')
  res.json({
    results: productos
  })

}






const busqueda = (req, res) => {

  const { coleccion, palabra } = req.params


  if (!colecciones.includes(coleccion)) {
    return res.status(400).json({
      msg: `las colecciones disponibles son : ${colecciones}`
    })
  }

  switch (coleccion) {
    case 'usuarios':
      busquedaUsuarios(palabra, res)
      break
    case 'categorias':
      busquedaCategorias(palabra, res)
      break
    case 'productos':
      busquedaProductos(palabra, res)
      break
    default:
      res.status(500).json({
        msg: 'Error de servidor...'
      })

  }




}

module.exports = { busqueda }