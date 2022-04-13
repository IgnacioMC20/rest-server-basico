const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
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
    }
});

CategoriaSchema.methods.toJSON = function() {
    // extraer props y regresar solo las que nos interesan
    let { __v, estado, _id, ...categoria } = this.toObject();
    // cambiar/agregar nuevas propiedades del objeto
    categoria.uid = _id;
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);