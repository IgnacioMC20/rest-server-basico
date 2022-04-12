const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio' ],
        unique: true,
    },
    password: {
        type: String,
        required: [ true, 'La contrase;a es obligatoria' ]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }

});

UsuarioSchema.methods.toJSON = function() {
    // extraer props y regresar solo las que nos interesan
    let { __v, password, _id, ...usuario } = this.toObject();
    // cambiar/agregar nuevas propiedades del objeto
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );