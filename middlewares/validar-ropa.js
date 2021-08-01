const Joi = require(`joi`);

const validarIdParamRopa = async(req, res, next) => {
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
const validarPostRopa = async(req, res, next) => {
    const schema = Joi.object({
        tipo: Joi.array()
            .items(
                Joi.string().valid(
                    "BUZO",
                    "REMERA",
                    "CAMPERA"
                )
            )
            .max(4)
            .required(),
        cantidad: Joi.number().required(),
        precio: Joi.number().required(),
        descripcion: Joi.string().required(),
        
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


// const validargetRopa = async(req, res, next) => {
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

const validarPutRopa = async(req, res, next) => {
    const schema = Joi.object({
        tipo: Joi.array()
        .items(
            Joi.string().valid(
                "BUZO",
                "REMERA",
                "CAMPERA"
            )
        )
        .max(4)
        .required(),
        cantidqad: Joi.number().required(),
        precio: Joi.number().required(),
        descripcion: Joi.string().required(),
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
    validarIdParamRopa,
    validarPostRopa,
    // validargetRopa,
    validarPutRopa
}