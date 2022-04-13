// ? se importan response y request de express para que salgan las props de estas
const { response, request } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');

const usuariosGet = async (req = request, res = response) => {
    // const {q, nombre = 'No Name', apikey} = req.query;
    const { limite, desde } = req.query;

    // const usuarios = await Usuario.find({estado: true}) // Mandamos la condicion en el find({condicion: true})
    // .skip(Number(desde))
    // .limit(parseInt(limite));

    // const totalUsuarios = await Usuario.countDocuments({estado: true});
    // res.json({totalUsuarios, usuarios});

    const [ usuarios, total ] = await Promise.all([
        Usuario.find({ estado: true }).skip(Number(desde)).limit(parseInt(limite)),
        Usuario.countDocuments({ estado: true })
    ])
    res.json({ 
        total,
        usuarios,
     });
}

const usuariosPut = async (req, res) => {
    const { id } = req.params; // ? get url params
    const { _id, password, google, correo, ...rest } = req.body; // ? get body params

    // Todo validar contra base de datos


    if(password){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest, { new: true });

    res.json({
        msg: `Usuario Actualizado: ${usuario.nombre}`,
        usuario
    });
}

const usuariosPost = async (req, res) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // ? Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    console.log('user', usuario);
    // ? Guardar en BD
    await usuario.save();

    res.status(201).json(usuario);
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;
    // ? usuario autenticado lo sacamos de la request.usuario
    const usuarioAutenticado = req.usuario;

    // ? fisicamente lo borramos
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    // console.log({usuarioAutenticado, usuario});

    res.json({
        msg: 'delete API - controlador usuarios',
        usuario,
    });
    
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador usuarios'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
}

/*
estructura del body
{
    "nombre": "test 1",
    "google": true,
    "nuevoCampo": true,
    "correo": "test1@test.com",
    "password": "123456",
    "rol": "ADMIN_ROLE"
}
*/