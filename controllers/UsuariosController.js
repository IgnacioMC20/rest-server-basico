// ? se importan response y request de express para que salgan las props de estas
const { response, request } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');

const usuariosGet = (req = request, res = response) => {
    const {q, nombre = 'No Name', apikey} = req.query;
    res.json({
        msg: 'get API - controlador usuarios',
        q,
        nombre,
        apikey,
    });
}

const usuariosPut = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'put API - controlador usuarios',
        id
    });
}

const usuariosPost = async (req, res) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    
    // ? Validar si el correo existe
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        return res.status(400).json({
            // ok: false,
            msg: 'El correo ya existe'
        });
    }

    // ? Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // ? Guardar en BD
    await usuario.save();

    res.status(201).json({
        msg: 'post API - controlador usuarios',
        // nombre,
        // edad,
        usuario
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador usuarios'
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