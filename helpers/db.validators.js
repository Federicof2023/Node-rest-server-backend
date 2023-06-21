const Role = require("../models/role.model");
const Usuario = require("../models/usuarios.model");

const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(
      `El role ${role} no se encuentra registrado en nuestra base de datos`
    );
  }
};

const emailExiste = async (correo = "") => {
  // verificar si el correo existe //
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(
      `El correo ${correo} ya esta registrado en nuestra base de datos`
    );
  }
};

// const usuarioValidoPorId = async (id) => {
//   // verificar si el correo existe //
//   const usuarioValido = await Usuario.findById(id)

//   if (!usuarioValido) {
//     throw new Error(`El ID ${id} no existe`);
//   }
// };

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

module.exports = { isValidRole, emailExiste, usuarioValidoPorId };
