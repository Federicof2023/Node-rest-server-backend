const { Producto } = require('../models');


const obtenerProductos = async (req, res) => {
  const { limit = 15, from = 0 } = req.query;
  const query = { estado: true }; // defino valor por default del estado en true//

  const [totalProductos, productos] = await Promise.all([
    Producto.countDocuments(query), // me traigo cantidad Total de productos en mi BD //
    Producto.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(from) // defino desde que  producto quiero que me muestre los   //
      .limit(limit), // limito cantidad de productos que me quiero traer  //
  ]);

  res.json({
    totalProductos,
    productos,
  });










}

const obtenerProducto = async (req, res) => {

  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json(producto);

}

const crearProducto = async (req, res) => {

  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: body.nombre });
  // valido si la producto  que ingresan ya existe //
  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`,
    });
  }
  // genero la data para guardar //
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);
  // y guardo....

  await producto.save();
  res.status(201).json(producto);

}



const actualizarProducto = async (req, res) => {

  const { id } = req.params;
  // extraigo el estado y el usuario  para no mostrarlo...//
  const { estado, usuario, ...data } = req.body;

  // aca me traigo el nombre a uppercase y el usuario

  if (data.nombre) { // --> solo si me llega el nombre lo capitalizo
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);














}

const eliminarProducto = async (req, res) => {

  const { id } = req.params
  const producto = await Producto.findByIdAndUpdate(id, { estado: false })

  res.json(producto);
}


module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto

}