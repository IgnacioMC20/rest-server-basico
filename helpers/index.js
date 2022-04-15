
const dbValidator = require('../../helpers/db-validator');
const generarJWT = require('../../helpers/generarJWT');
const googleVerify = require('../../helpers/google-verify');
const subirArchivo = require('../../helpers/subirArchivo');

module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
}