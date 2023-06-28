const { Categoria } = require("../models/");






// tareas :

// obtener categorias -por  paginado - total - y populate//
const obtenerCategorias = async (req, res) => {
  const { limit = 15, from = 0 } = req.query;
  const query = { estado: true }; // defino valor por default del estado en true//

  const [totalCategorias, categorias] = await Promise.all([
    Categoria.countDocuments(query), // me traigo cantidad Total de categorias en mi BD //
    Categoria.find(query)
      .populate("usuario", "nombre")
      .skip(from) // defino desde que  registro quiero que me muestre los registros  //
      .limit(limit), // limito cantidad de registros que me quiero traer  //
  ]);

  res.json({
    totalCategorias,
    categorias,
  });
};

// obtener categoria por id y populate {} //
const obtenerCategoria = async (req, res) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.json(categoria);
};





// crear una categoria//
const crearCategoria = async (req, res) => {
  // busco //
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  // valido si la categoria que ingresan ya existe //
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  // genero la data para guardar //
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  // y guardo....
  await categoria.save();

  res.status(201).json(categoria);
};

// actualizar una categoria //

const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  // extraigo el estado y el usuario  para no mostrarlo...//
  const { estado, usuario, ...data } = req.body;

  // aca me traigo el nombre a uppercase y el usuario
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

// borrar categoria //
const eliminarCategoria = async (req, res) => {

  const { id } = req.params


  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false })



  res.json(categoria);










};

module.exports = {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
};
