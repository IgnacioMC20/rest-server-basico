const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generarJWT");

const Usuario = require("../models/Usuario");


// ? ejemplo de login basico
const login = async(req, res = response) => {

    const { password, correo } = req.body;

    try {
        //Verificar el email
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: 'El correo no existe'
            });
        }

        //Verificar si el usuario esta activo en la base de datos
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'La contraseña no es correcta'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            msg: "login API - controlador usuarios",
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error',
            error
        });
    }
}

module.exports = {
    login,
}