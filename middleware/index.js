
const validarCampos = require('../middleware/valida-campos');
const validarJWT = require('../middleware/validar-jwt');
const validaRoles = require('../middleware/validar-roles');


module.exports = {
    ...validaRoles,
    ...validarJWT,
    ...validarCampos,
}