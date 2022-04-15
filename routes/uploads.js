

const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, getImage, updateImageCloudinary } = require('../controllers/UploadsController');
const { ColeccionesPermitidas } = require('../helpers/db-validators');
// const { existeArchivo } = require('../helpers/subirArchivo');
const { validarCampos, validarArchivoSubir } = require('../middleware');


const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => ColeccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos,
], updateImageCloudinary);
// ], actualizarImagen);

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => ColeccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos,
], getImage);


module.exports = router;