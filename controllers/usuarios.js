const { response, request } = require('express');

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

const usuariosPost = (req, res) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - controlador usuarios',
        nombre,
        edad,
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