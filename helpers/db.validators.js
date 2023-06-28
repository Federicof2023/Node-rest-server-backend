const { Categoria, Usuario, Producto } = require("../models");
const Role = require("../models/role.model");

// validador para los roles //
const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(
      `El role ${role} no se encuentra registrado en nuestra base de datos`
    );
  }
};

// validador para email //
const emailExiste = async (correo = "") => {
  // verificar si el correo existe //
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(
      `El correo ${correo} ya esta registrado en nuestra base de datos`
    );
  }
};

// validador para Usuarios //
const usuarioValidoPorId = async (id) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const usuarioValido = await Usuario.findById(id).exec();
    if (!usuarioValido) {
      throw new Error(`El id ${id} no existe`);
    }
  } else {
    throw new Error(`El ID -> ${id} no es un ID válido`);
  }
};

// validador para las Productos //
const productoValidoporID = async (id) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const productoValido = await Producto.findById(id).exec();
    if (!productoValido) {
      throw new Error(`El id ${id} no existe`);
    }
  } else {
    throw new Error(`El ID -> ${id} no es un ID válido`);
  }
};

// validador para las Categorias //
const categoriaValidaporID = async (id) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const categoriaValida = await Categoria.findById(id).exec();
    if (!categoriaValida) {
      throw new Error(`El id ${id} no existe`);
    }
  } else {
    throw new Error(`El ID -> ${id} no es un ID válido`);
  }
};

// validador para colleciones permitidas de archivos/imagenes //

const coleccionesValidas = (coleccion = '', colecciones = []) => {

  const coleccionIncluida = colecciones.includes(coleccion)

  if (!coleccionIncluida) {
    throw new Error(`la coleccion ${coleccion} no esta permitida - ${colecciones}`)
  }

  return true

}








module.exports = {
  isValidRole,
  emailExiste,
  usuarioValidoPorId,
  categoriaValidaporID,
  productoValidoporID,
  coleccionesValidas
};
