const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Configuracion de sockets
    this.io = socketio(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configureSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Init middlewares
    this.middlewares();

    // Init sockets
    this.configureSockets();

    // Init server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
