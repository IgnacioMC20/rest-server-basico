const express = require('express'); // ? import express
const cors = require('cors'); // ? import cors
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
        }
        // this.config();

        //? Conectar a la base de datos
        this.conectarDB();

        // ? Middlewares
        this.middlewares();

        // ? Routes
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
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
        this.app.use(this.paths.usuarios, require('../routes/Usuario'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
    }
        
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}!`.blue);
        });
    }
}

module.exports = Server;