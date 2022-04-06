const express = require('express'); // ? import express
const cors = require('cors'); // ? import cors

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        // this.config();

        // ? Middlewares
        this.middlewares();

        // ? Routes
        this.routes();
    }

    middlewares(){
        // ? directorio publico
        this.app.use(express.static('public'));

        // ? Cors
        this.app.use( cors() );

        // ? Lectura y parseo del body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }
        
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}!`);
        });
    }
}

module.exports = Server;