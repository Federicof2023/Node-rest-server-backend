const express = require("express");//  express//
const cors = require("cors"); // cors//
const { conectarDb } = require('./db/db.config')



// ------------- CLASE SERVER ------------------- // 




class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usuariosPath = '/api/usuarios'
    this.authPath = '/api/auth'  // creo path para autenticacion //

    // Conectar la DB //
    this.conecxionDb()


    // middlewares //
    this.middlewares()
    // endpoints //
    this.routes();
  }

  async conecxionDb() {
    await conectarDb()
  }




  middlewares() {
    // cors// 
    this.app.use(cors())

    // parseo y lectura del body //
    this.app.use(express.json())




    // carpeta public //
    this.app.use(express.static('public'))
  }





  // ENDPOINTS //  
  routes() {
    this.app.use(this.authPath, require('./routes/auth.router')) // defino la ruta //
    this.app.use(this.usuariosPath, require('./routes/usuarios.router'))

  }

  // puerto esuchando...//
  listen() {
    this.app.listen(this.port, () => {
      console.log('listening on port ', this.port);
    });
  }
}

module.exports = Server;
