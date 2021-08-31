const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuarios");

const bcryptjs = require('bcryptjs');



const login = async(req, res) => {

    const { email, password } = req.body;




    // console.log(req.body)

    try {

        //verificamos si el usuario existe

        const usuario = await Usuario.findOne({ email });
        //si no existe el usuario o el password
        if (!usuario || !bcryptjs.compareSync(password, usuario.password)) {
            return res.status(400).json({
                code: "auth error",
                message: "invalid email or password",
                success: false,
                data: null
            })
        }
        //sing({payload =  vamos a guardar el id}, clave privada) ----  el expiredin es para que el token espire con el tiempo (yo le puse un año asi no me molesta)
        const token = jwt.sign({ _id: usuario._id }, process.env.PRIVATE_KEY, { expiresIn: "8760h" });
        console.log(token);


        return res.status(200).json({
            code: "Ok Send Correcto",
            message: null,
            success: true,
            //le envio el token
            data: {
                usuario,
                token
            }
        });
    } catch (error) {
        return res.status(500).json({
            code: "ERR",
            message: error.message,
            success: false,
            data: null
        });
    }
}


const registro = async(req, res) => {

    const { password, ...resto } = req.body;

    resto.password = bcryptjs.hashSync(password, 10);

    try {
        const usuario = await Usuario.create(resto);
        console.log(usuario);
        res.status(200).json({
            code: "Ok",
            message: null,
            success: true,
            data: usuario
        });
    } catch (error) {
        console.log(error);

        // Esta es nuestra respuesta desde el backend
        return res.status(500).send({
            code: "ERR",
            message: error.message,
            success: false,
            data: null
        });
    }
};

module.exports = {
    login,
    registro
};