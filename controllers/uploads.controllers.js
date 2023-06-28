const path = require("path");
const fs = require("fs");

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dnaymxh9g',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});




const { helperUploadfiles } = require("../helpers");
const { Usuario, Producto } = require("../models");

const uploadFiles = async (req, res) => {
  try {
    // ejem : txt   xlt
    // const name_file = await helperUploadfiles(req.files, ['txt', 'xlt'], 'textos')
    const name_file = await helperUploadfiles(req.files, undefined, "imgs");

    res.json({ name_file });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateFile = async (req, res) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con ese ${id}` });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe ningun producto con este ID : ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Server error" });
  }

  // borrar  archivos/imagenes  previas //

  if (modelo.imagen) {
    // eliminar la imagen/archivo  del servidor //

    // se crea el path donde se encuentra el archivo/img a borrar y valido si retorna true se borra//
    const pathArchivo = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.imagen
    );
    if (fs.existsSync(pathArchivo)) {
      fs.unlinkSync(pathArchivo); // <-unlinkSync lo elimina
    }
  }

  const name_file = await helperUploadfiles(req.files, undefined, coleccion);
  modelo.imagen = name_file;

  await modelo.save();
  res.json(modelo);
};




const updateCloudinaryFile = async (req, res) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con ese ${id}` });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe ningun producto con este ID : ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Server error" });
  }


  // eliminar la imagen de cloudinary
  if (modelo.imagen) {

    // spliteo el public_id de la imagen //
    const idImagen = modelo.imagen.split("/")
    const nombre = idImagen[idImagen.length - 1]
    const [public_id] = nombre.split(".")

    // lo elimino  de  cloudinary//
    cloudinary.uploader.destroy(public_id)

  }

  // subo imagenes a cloudinary  y gravo //
  const { tempFilePath } = req.files.archivo
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

  modelo.imagen = secure_url
  await modelo.save();

  res.json(modelo);
};



const mostrarArchivo = async (req, res) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con ese ${id}` });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe ningun producto con este ID : ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Server error" });
  }

  // borrar  archivos/imagenes  previas //

  if (modelo.imagen) {
    // eliminar la imagen/archivo  del servidor //

    // se crea el path donde se encuentra el archivo/img a borrar y valido si retorna true se borra//
    const pathArchivo = path.join(__dirname, "../uploads", coleccion, modelo.imagen
    );
    if (fs.existsSync(pathArchivo)) {
      return res.sendFile(pathArchivo)

    }
  }

  const ImgNotfound = path.join(__dirname, "../assets/no-image.jpg")
  res.sendFile(ImgNotfound)





}



module.exports = {
  uploadFiles,
  updateFile,
  mostrarArchivo,
  updateCloudinaryFile
};
