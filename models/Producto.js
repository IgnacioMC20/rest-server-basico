const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    estado:{
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        // ? Referencia a la coleccion usuarios
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
    },
    descripcion: {
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String,
    }
});

ProductoSchema.methods.toJSON = function() {
    // extraer props y regresar solo las que nos interesan
    let { __v, estado, _id, ...producto } = this.toObject();
    // cambiar/agregar nuevas propiedades del objeto
    producto.uid = _id;
    return producto;
}

module.exports = model('Producto', ProductoSchema);