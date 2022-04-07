// ? se importan response y request de express para que salgan las props de estas
const { response, request } = require('express');

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

    
    const body = req.body
    const usuario = new Usuario(body);
    const { nombre, edad } = req.body;
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