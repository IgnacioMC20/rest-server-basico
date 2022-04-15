const { response } = require("express");
const { subirArchivo, existeArchivo } = require("../helpers/subirArchivo");
const { Usuario, Producto } = require("../models");
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config( process.env.CLOUDINARY_URL );


const cargarArchivo = async(req, res = response) => {

//  existeArchivo(req, res);
  
  try {
    const nombre = await subirArchivo(req.files, ['txt', 'md'],'textos');
    // ? podemos no manndar argumentos con undefined
    res.json({ nombre });
  } catch (error) {
    res.status(400).json({msg: error});
  }

}

const actualizarImagen = async(req, res = response) => {

//  existeArchivo(req, res);
  const { id, coleccion } = req.params;
  
  let model;
  switch (coleccion) {
    case 'usuarios':
      model = await Usuario.findById(id);
      if(!model) {
        res.status(404).json({msg: `no se encontro el usuario con el id ${id}` });
        return;
      }
      break;
      case 'productos':
        model = await Producto.findById(id);
        if(!model) {
          res.status(404).json({msg: `no se encontro el producto con el id ${id}` });
          return;
        }
      break;
    default:
      res.status(400).json({msg: 'La coleccion no es valida'});
      return;
  }

  // ? Limpiar imagen anterior
  if(model.img){
    const pathImagen = path.join(__dirname, `../uploads/${coleccion}/${model.img}`);
    console.log(pathImagen);
    if( fs.existsSync(pathImagen) ){
      fs.unlinkSync(pathImagen);
    }
  }
  
  const nombre = await subirArchivo(req.files, undefined, coleccion).catch(err => {
    res.status(400).json({msg: err});
  });

  model.img = nombre;

  await model.save();

  res.json(model);
  
}

const updateImageCloudinary = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let model;
  switch (coleccion) {
    case 'usuarios':
      model = await Usuario.findById(id);
      if (!model) {
        res.status(404).json({ msg: `no se encontro el usuario con el id ${id}` });
        return;
      }
      break;
    case 'productos':
      model = await Producto.findById(id);
      if (!model) {
        res.status(404).json({ msg: `no se encontro el producto con el id ${id}` });
        return;
      }
      break;
    default:
      res.status(400).json({ msg: 'La coleccion no es valida' });
      return;
  }

  // ? Limpiar imagen anterior
  if (model.img) {
    const nombreArr = model.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [ public_id ] = nombre.split('.');

    cloudinary.uploader.destroy(public_id);
  }
  const { tempFilePath } = req.files.archivo;

  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

  model.img = secure_url;

  await model.save();

  res.json(model);

}

const getImage = async(req, res) => {

  const { id, coleccion } = req.params;

  let model;
  
  switch (coleccion) {
    case 'usuarios':
      model = await Usuario.findById(id);
      if(!model) {
        return res.status(404).json({msg: `no se encontro el usuario con el id ${id}` });
      }
      break;
      case 'productos':
        model = await Producto.findById(id);
        if(!model) {
          res.status(404).json({msg: `no se encontro el producto con el id ${id}` });
          return;
        }
      break;
    default:
      res.status(400).json({msg: 'La coleccion no es valida'});
      return;
  }

  if(model.img){
    const pathImagen = path.join(__dirname, `../uploads/${coleccion}/${model.img}`);
    if( fs.existsSync(pathImagen) ){
      return res.sendFile(pathImagen);
    }else{
      return res.sendFile(path.join(__dirname, '../assets/default.jpg'));
    }
  }


  res.json({msg: 'No existe la imagen'});
}



module.exports = {
    cargarArchivo,
    actualizarImagen,
    updateImageCloudinary,
    getImage,

}