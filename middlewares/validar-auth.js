const jwt = require('jsonwebtoken');
const Joi = require(`joi`);
const Usuario = require("../models/usuarios");

const validateToken = async(req, res, next) => {

    // no queremos validar en login ya que ahi deberiamos obtener el token
    if (req.url === "/auth/login" || req.url === "/auth/registro") return next();



    //aca espero la respuesta desde el header, osea q me mande el token
    // req.headers.authorization

    const authorization = req.headers.authorization;

    //si el token es invalido
    if (!authorization) {
        return res.status(401).json({
            code: "AUTH-ERR",
            message: "Token authorization must be provided",
            success: false,
            data: null
        })
    }

    try {



        //gguardamos el token para proxima utilizacion, lo guardamos como array pero solo utilizamos la segunda parte el index 1 como token solo

        const token = authorization.split(" ")[1];

        //verifica que el token enviado sea valido
        const { _id } = jwt.verify(token, process.env.PRIVATE_KEY);
        //verificamos si el usuario existe

        const usuario = await Usuario.findById({ _id });
        //si no existe el usuario
        if (!usuario) {
            return req.status(401).json({
                code: "auth error",
                message: "El usuario no existe",
                success: false,
                data: null
            })
        }
        //guardamos el user en req
        req.usuario = usuario;


        return next();
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({
            code: "AUTH-ERR",
            message: error.message,
            success: false,
            data: null
        })
    }
};

const validateLogin = async(req, res, next) => {
    const schema = Joi.object({
        // _id: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    });

    try {
        await schema.validateAsync(req.body);
        return next();
    } catch (error) {
        return res.status(404).json({
            code: "VALIDATION-ERR",
            message: error.details[0].message,
            success: false,
            data: null
        });
    }
};

const validateRoles = (...roles) => {
    return async(req, res, next) => {
        if (!roles.includes(req.usuario.roles)) {
            return res.status(403).json({
                code: "sutj-ERR",
                message: "acceso restringido",
                success: false,
                data: null

            });
        }
        return next();
    };
};

module.exports = {
    validateToken,
    validateLogin,
    validateRoles
}