const express = require("express");//  express//
const cors = require("cors"); // cors//



// ------------- CLASE SERVER ------------------- // 
class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios'

    // middlewares //
    this.middlewares()
    // endpoints //
    this.routes();
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
    this.app.use(this.usuariosPath, require('../routes/usuarios.router'))

  }

  // puerto esuchando...//
  listen() {
    this.app.listen(this.port, () => {
      console.log('listening on port ', this.port);
    });
  }
}

module.exports = Server;
