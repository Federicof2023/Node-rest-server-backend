const path = require('path')
const { v4: uuidv4 } = require('uuid');



// metodo para subir archivos //
const helperUploadfiles = (files, validExtensions = ["png", "jpg", "jpeg", "gif"], folder = '') => {

  return new Promise((resolve, reject) => {

    const { archivo } = files;
    const nombreConPunto = archivo.name.split(".");
    const extn = nombreConPunto[nombreConPunto.length - 1];

    //⇨ validar extensiones //
    if (!validExtensions.includes(extn)) {
      return reject(`El formato de extension ${extn} no esta permitida fijate estas :  ${validExtensions}`)
    }
    const tempName = uuidv4() + "." + extn;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err)
      }
      resolve(tempName)
    });
  });
};

module.exports = {
  helperUploadfiles,
};
