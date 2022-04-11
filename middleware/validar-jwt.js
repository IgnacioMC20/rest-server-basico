const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario");


const validarJWT = async(req, res = response, next) => {
    
    const token = req.header('x-token');
    // console.log(token);
    if(!token){
        return res.status(401).json({
            msg: 'No hay token'
        });
    }

    try {
   
        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
                
        // ? leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if(!usuario){
            return res.status(404).json({
                msg: 'El usuario no existe'
            });
        }
        
        // ? Verificar si el usuario esta activo en la base de datos
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            });
        }        

        req.usuario = usuario;
        
        // ? Continuar con la ejecucion
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor',
            error
        });
    }

}
module.exports = {
    validarJWT,
}