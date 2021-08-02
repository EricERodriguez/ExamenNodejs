const jwt = require('jsonwebtoken');

const validateToken = async(req, res, next) => {

    // no queremos validar en login ya que ahi deberiamos obtener el token
    if (req.url === "/auth/login" || "/auth/registro") return next();



    try {

        //aca espero la respuesta desde el header, osea q me mande el token
        // req.headers.authorization

        const authorization = req.headers.authorization;

        //gguardamos el token para proxima utilizacion, lo guardamos como array pero solo utilizamos la segunda parte el index 1 como token solo

        const token = authorization.split(" ")[1];

        //verifica que el token enviado sea valido
        jwt.verify(token, process.env.PRIVATE_KEY)
        return next();
    } catch (error) {
        return res.status(404).json({
            code: "AUTH-ERR",
            message: error.message,
            success: false,
            data: null
        })
    }
};



module.exports = {
    validateToken
}