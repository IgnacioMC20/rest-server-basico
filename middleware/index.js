
const validarCampos = require('../middleware/valida-campos');
const validarJWT = require('../middleware/validar-jwt');
const validaRoles = require('../middleware/validar-roles');
const validarArchivoSubir = require('../middleware/validarArchivoSubir');


module.exports = {
    ...validaRoles,
    ...validarJWT,
    ...validarCampos,
    ...validarArchivoSubir,
}