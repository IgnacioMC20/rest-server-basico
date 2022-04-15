const { Categoria, Role, Usuario, Producto } = require('../models');

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

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if(!existeCategoria){
    throw new Error(`La categoria no existe`);
  }
}

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if(!existeProducto){
      throw new Error(`El producto no existe`);
  }
}

const ColeccionesPermitidas = (colecion = '', colecciones = []) => {
    const incluida = colecciones.includes(colecion);
    if(!incluida){
        throw new Error(`La coleccion ${colecion} no esta permitida, colecciones permitidas: ${colecciones.join(', ')}`);
    }
    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    ColeccionesPermitidas,
}