const { response } = require("express");
const { Producto, Categoria } = require("../models");

// obtenerproductos - paginado - total - populate
const obtenerProductos = async(req, res = response) => {
    try {
        const { desde = 0, limite = 5 } = req.query;
        const query = {estado: true};
        
        const [ total, productos ] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('usuario', 'nombre correo') 
                // .exec()
        ]);

        res.json({
            total, 
            productos,
        });

    } catch (error) {
        return res.status(400).json({
            msg: "Error al obtener las productos",
            error,
        });
    }
};
// obtenerproducto - populate {}
const obtenerProducto = async(req, res = response) => {
    try {
        const { id } = req.params;
        console.log(id);
        const producto = await Producto.findById(id)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');

            console.log(producto);
        res.json({
            producto,
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: "Error al obtener la producto",
            error,
        });
    }
};


// actualizarproducto 
const actualizarProducto = async(req, res = response) => {
    try {
        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;
        data.nombre = data.nombre.toUpperCase();
        const producto = await Producto.findByIdAndUpdate(id, data , { new: true });
        res.json({
            producto,
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: "Error al actualizar la producto",
            error,
        });
    }
};

// borrarproducto
const eliminarProducto = async(req, res = response) => {
    try {
        const { id } = req.params;
        const productoBorrada = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
        res.json({
            msg: 'producto borrado',
            productoBorrada,
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: "Error al eliminar la producto",
            error,
        });
    }
};


const crearProducto = async(req, res = response) => {

  const nombre = req.body.nombre.toUpperCase(); 
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({nombre});

  if(productoDB){
    return res.status(400).json({
      msg: 'producto ya existe'
    });
  }
    const data = {
        ...body,
        usuario: req.usuario._id,
    }

  // ? Crear producto
  const producto = new Producto(data);

  // ? Guardar producto
  await producto.save();

  res.status(201).json(producto);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
}