const jwt = require('jsonwebtoken');


const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid };

        return jwt.sign(payload, process.env.SECRETORPUBLICKEY, {
            expiresIn: '4h'
            }, (err, token) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    resolve(token);
                }
            });
    })
}

module.exports = {
    generarJWT,
};