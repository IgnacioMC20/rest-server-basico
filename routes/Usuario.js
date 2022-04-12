const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/UsuariosController');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

// const { validarCampos } = require('../middleware/valida-campos');
// const { validarJWT } = require('../middleware/validar-jwt');
// const { isAdminRole, hasRole } = require('../middleware/validar-roles');

const { validarCampos, validarJWT, hasRole, isAdminRole } = require('../middleware')

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es id de mongo').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos,
], usuariosPut);

router.post('/', [
    // ? Validar si el correo existe
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener un minimo de 6 caracteres').isLength({ min: 6 }),
    check('correo').custom( email =>  emailExiste(email) ),
    check('correo', 'El correo no es valido').isEmail(),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    // isAdminRole, por fuerza tiene que ser administrador
    hasRole('ADMIN_ROLE', 'VENTAS_ROLE'), // puede ser cualquiera de estos roles
    check('id', 'No es id de mongo').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;