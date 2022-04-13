
const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProducto, obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/ProductosController');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middleware');

const { validarCampos } = require('../middleware/valida-campos');

const router = Router();

// ? Obtener todas las producto
router.get('/', obtenerProductos);

// ? Obtener una producto por id
router.get('/:id', [
    // check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);

// ? Crear producto - privado - cualquier persona con token
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('catetoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom(existeCategoriaPorId),
    check('categoria', 'No es un id valido de mongo').isMongoId(),
    // check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    // check('usuario', 'No es un id valido de mongo').isMongoId(),
    validarCampos,
], crearProducto);

// ? Actualizar un registro por id
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeProductoPorId ),
    check('id', 'No es un id valido de mongo').isMongoId(),
    validarCampos,
], actualizarProducto);

// ? Eliminar un registro por id - solo ADMIN_ROLE
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], eliminarProducto);

module.exports = router;

