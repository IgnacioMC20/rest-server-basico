const mongoose = require('mongoose');
require('colors');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true, Ya no es soportada
            // useFindAndModify: false, Ya no es soportada
        });

        console.log('Base de datos ONLINE'.rainbow);
    } catch (error) {
        console.log(error);
        throw new Error('Erorr en la conexion a la base de datos');    
    }
}

module.exports = {
    dbConnection,
}