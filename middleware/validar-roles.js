const { response } = require("express");


const isAdminRole = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'No hay usuario'
        });
    }

    const { role } = req.usuario;
    if(role !== 'ADMIN_ROLE'){
        return res.status(400).json({
            msg: 'El usuario no es administrador'
        });
    }


    next();
}

// ? usamos el operador rest/spread para recibir todos los argumentos que nos mandan
// ! un middleware siempre tiene que regresar una funcion
const hasRole = (...roles) => {

  return (req, res = response, next) => {
    
    if(!req.usuario){
        return res.status(500).json({
            msg: 'No hay usuario'
        });
    }
    
    if(!roles.includes(req.usuario.rol)){
        return res.status(401).json({
            msg: `El servicio requiere uno de estos roles: ${roles.join(', ')}`
        });
    }

    console.log(roles, req.usuario.rol);
    
    next();
  }
}

module.exports = {
    isAdminRole,
    hasRole,
}