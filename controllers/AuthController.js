const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {
        
        const { nombre, correo, img } = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({ correo });

        //crear usuario si no existe
        if(!usuario){
            const data = {
                nombre,
                correo,
                img,
                password: ':)',
                google: true,
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario esta bloqueado en DB
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        // console.log(googleUser);
        
        res.json({
            msg: "google login API - controlador usuarios - todo ok",
            usuario,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Hubo un error con la verificacion del token',
            error
        });
    }

}


module.exports = {
    login,
    googleSignIn,
}