// ? para tener variables de entorno .env
require('dotenv').config();


const Server = require('./models/server');
const server = new Server();

// require('colors');

server.listen();