
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/CategoriasController');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middleware');

const { validarCampos } = require('../middleware/valida-campos');

const router = Router();

// ? Obtener todas las categorias
router.get('/', obtenerCategorias);

// ? Obtener una categoria por id
router.get('/:id', [
    // ?  check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);

// ? Crear categoria - privado - cualquier persona con token
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearCategoria);

// ? Actualizar un registro por id
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    check('id', 'No es un id valido de mongo').isMongoId(),
    validarCampos,
], actualizarCategoria);

// ? Eliminar un registro por id - solo ADMIN_ROLE
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], eliminarCategoria);

module.exports = router;

