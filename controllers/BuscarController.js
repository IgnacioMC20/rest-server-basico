const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles'];

const buscarUsuarios = async (termino = '', res = response) => {
  
    const esMongoId = ObjectId.isValid(termino); // true
    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }else{

        // ? expresionr regular
        const regex = new RegExp(termino, 'i');

        // ? buscamos usuarios que coincidan con el termino y estado true
        const usuario = await Usuario.find({ 
            $or: [ {nombre : regex}, {correo : regex} ],
            $and: [{ estado: true }]
         });

         // ? contamos los usuarios
        const usuarioCount = await Usuario.count({ 
            $or: [ {nombre : regex}, {correo : regex} ],
            $and: [{ estado: true }]
         });

        return res.json({
            results: usuario,
            cantidad: usuarioCount
        });
    }
}

const buscarCategorias = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); // true

    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }else{

        // ? expresion regular
        const regex = new RegExp(termino, 'i');

        // ? buscamos categorias que coincidan con el termino y estado true
        const categoria = await Categoria.find({nombre: regex, estado: true });

         // ? contamos los categorias
        const categoriaCount = await Categoria.count({nombre: regex, estado: true });

        return res.json({
            results: categoria,
            cantidad: categoriaCount
        });
    }
}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); // true

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    } else {

        // ? expresion regular
        const regex = new RegExp(termino, 'i');

        // ? buscamos productos que coincidan con el termino y estado true
        const producto = await Producto.find({
            $or: [{nombre: regex}, {descripcion: regex}],
            $and: [{ estado: true }]
        }).populate('categoria', 'nombre');

        // ? contamos los productos
        const productoCount = await Producto.count({
            $or: [{nombre: regex}, {descripcion: regex}],
            $and: [{ estado: true }]
        });

        return res.json({
            results: producto,
            cantidad: productoCount
        });
    }

}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas.join(', ')}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
    
        default:
            res.status(500).json({
                msg: 'Error al buscar'
            });
            
    }
//   res.json({
//       msg:'buscar api - get',
//       coleccion,
//       termino,
//   })
}

module.exports = {
    buscar
}