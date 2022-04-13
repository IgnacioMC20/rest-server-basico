const { response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {
    try {
        const { desde = 0, limite = 5 } = req.query;
        const query = {estado: true};
        
        const [ total, categorias ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('usuario', 'nombre correo') 
                // .exec()
        ]);

        res.json({
            total, 
            categorias,
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "Error al obtener las categorias",
            error,
        });
    }
};
// obtenerCategoria - populate {}
const obtenerCategoria = async(req, res = response) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id)
            .populate('usuario', 'nombre correo')

        res.json({
            categoria,
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: "Error al obtener la categoria",
            error,
        });
    }
};


// actualizarCategoria 
const actualizarCategoria = async(req, res = response) => {
    try {
        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;
        data.nombre = data.nombre.toUpperCase();
        const categoria = await Categoria.findByIdAndUpdate(id, data , { new: true });
        res.json({
            categoria,
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: "Error al actualizar la categoria",
            error,
        });
    }
};

// borrarCategoria
const eliminarCategoria = async(req, res = response) => {
    try {
        const { id } = req.params;
        const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
        res.json({
            msg: 'Categoria borrada',
            categoriaBorrada,
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: "Error al eliminar la categoria",
            error,
        });
    }
};


const crearCategoria = async(req, res = response) => {

  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({nombre});

  if(categoriaDB){
    return res.status(400).json({
      msg: 'Categoria ya existe'
    });
  }
  console.log(req.usuario);

  const data = {
      nombre,
      usuario: req.usuario._id,
  }

  // ? Crear categoria
  const categoria = new Categoria(data);

  // ? Guardar categoria
  await categoria.save();

  res.status(201).json(categoria);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria,
}