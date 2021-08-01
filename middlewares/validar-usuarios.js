const Joi = require(`joi`);

const validarIdParamUsuario = async(req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().required()
    }).required();

    try {
        await schema.validateAsync(req.params);
        return next();
    } catch (error) {
        return res.status(404).json({
            code: "VALIDATION-ERR",
            message: error.details[0].message,
            success: false,
            data: null
        })
    }
};

//requerimos todos porq es para crear un usuario
const validarPostUsuario = async(req, res, next) => {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        roles: Joi.array()
            .items(
                Joi.string().valid(
                    "ADMIN",
                    "EMPLOYER",
                    "USER"
                )
            )
            .max(4)
            .required(),
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


// const validargetUsuario = async(req, res, next) => {
//     const schema = Joi.object({
//         _id: Joi.string().required()
//     });

//     try {
//         await schema.validateAsync(req.params);
//         return next();
//     } catch (error) {
//         return res.status(404).send({
//             mensaje: "Datos de entrada invalidos"
//         })
//     }

// };

const validarPutUsuario = async(req, res, next) => {
    const schema = Joi.object({
        password: Joi.string(),
        email: Joi.string().email(),
        roles: Joi.array()
            .items(
                Joi.string().valid(
                    "ADMIN",
                    "EMPLOYER",
                    "USER"
                )
            )
            .max(4),
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





module.exports = {
    validarIdParamUsuario,
    validarPostUsuario,
    // validargetUsuario,
    validarPutUsuario
}