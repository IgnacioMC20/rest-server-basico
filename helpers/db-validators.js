const Role = require('../models/Role');
const Usuario = require('../models/Usuario'); 


const esRolValido = async( rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe`);
    }
}

// const emailExiste = async( email = '' ) => {
//   const existeEmail = await Usuario.findOne({ email });
//     if(existeEmail){
//         throw new Error(`El email ${email} ya existe`);
//     }
// }

// ? Validar si el correo existe
const emailExiste = async (correo = '') => {
    const existeCorreo = await Usuario.findOne( { correo } );
    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya existe`);
    }
}

// ? Validar si el usuario por id existe
const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if (!existeUsuario) {
        throw new Error(`El usuario no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
}