const validarArchivoSubir = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({msg: 'no se ha seleccionado ningun archivo'});
      }
    
      if (!req.files.archivo) {
        return res.status(400).json({msg: 'no se ha seleccionado ningun archivo'});
        
      }
    next();
}

module.exports = {
    validarArchivoSubir,
}