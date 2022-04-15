const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( {archivo}, extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'], carpeta = '' ) => {

    return new Promise( ( resolve, reject ) => {
        // const { archivo } = files;
    
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
      
        // ? validar la extension
        //   const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
          if(!extensionesValidas.includes(extension)){
            //   response.status(400).json({msg: `La extension ${extension} no es valida`});
            return reject(`La extension ${extension} no es valida - extensionesValidas: ${extensionesValidas.join(', ')}`);
          }
          
        const nombreTemp = uuidv4() + '.' + extension;
        uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
              console.log(err);
            return reject(err);
          }
      
          resolve( nombreTemp );
        });
    });
}

// const existeArchivo = (req, res) => {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         res.status(400).json({msg: 'no se ha seleccionado ningun archivo'});
//         // return;
//       }
    
//       if (!req.files.archivo) {
//         res.status(400).json({msg: 'no se ha seleccionado ningun archivo'});
//         // return;
//       }
// }

module.exports = {
    subirArchivo,
    // existeArchivo,
}