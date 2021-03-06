const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/AuthController');

const { validarCampos } = require('../middleware/valida-campos');
const { validarJWT } = require('../middleware/validar-jwt');


const router = Router();

router.post('/login', [
    // validarJWT,
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo debe ser un email').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
], login);

router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos,
], googleSignIn);

module.exports = router;