const express = require("express"); //  express//
const cors = require("cors"); // cors//
const { conectarDb } = require("./db/db.config");
const fileUpload = require('express-fileupload');

// ------------- CLASE SERVER ------------------- //

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      busqueda: '/api/busqueda',
      categorias: "/api/categorias",
      productos: "/api/productos",
      usuarios: "/api/usuarios",
      uploads: "/api/uploads",
    };

    // Conectar la DB //
    this.conecxionDb();

    // middlewares //
    this.middlewares();
    // endpoints //
    this.routes();
  }

  async conecxionDb() {
    await conectarDb();
  }

  middlewares() {
    // cors//
    this.app.use(cors());

    // parseo y lectura del body //
    this.app.use(express.json());

    // carpeta public //
    this.app.use(express.static("public"));


    // fileUploads- Cargar archivos //
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true

    }));



  }

  // ENDPOINTS //
  routes() {
    this.app.use(this.paths.auth, require("./routes/auth.router"));    // defino la rutas //
    this.app.use(this.paths.categorias, require("./routes/categorias.router"));
    this.app.use(this.paths.busqueda, require("./routes/busqueda.router"));
    this.app.use(this.paths.productos, require("./routes/productos.router"));
    this.app.use(this.paths.usuarios, require("./routes/usuarios.router"));
    this.app.use(this.paths.uploads, require("./routes/uploads.router"));
  }

  // puerto esuchando...//
  listen() {
    this.app.listen(this.port, () => {
      console.log("listening on port ", this.port);
    });
  }
}

module.exports = Server;
