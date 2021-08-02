const Usuario = require("../models/usuarios");
const bcryptjs = require('bcryptjs');



const getAllUsuarios = async(req, res) => {

    //paginado

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skipIndex = (page - 1) * limit;


    try {
        const count = await Usuario.countDocuments();
        const results = await Usuario.find().sort({ _id: 1 }).limit(limit).skip(skipIndex);
        return res.status(200).json({
            code: "Ok getAll",
            message: null,
            success: true,
            data: {
                count,
                results
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




// const usuarios = [{
//     _id: "asd",
//     nombre: "adolfo",
//     apellido: "Gutierrez",
//     fec_nac: "Tue Jul 13 2021 19:24:14 GMT-0300",
//     password: "lksudhf",
//     email: "nc@example.com",
//     roles: ["ADMIN"]
// }]


const getUsuario = async(req, res) => {
    try {
        const usuario = await Usuario.findById(req.params._id);
        if (!usuario) {
            return res.status(404).json({
                code: "NOT_FOUND",
                message: null,
                success: false,
                data: null
            });
        };
        return res.status(200).json({
            code: "Ok get",
            message: null,
            success: true,
            data: usuario
        });
    } catch (error) {
        return res.status(500).json({
            code: "ERR",
            message: error.message,
            success: false,
            data: null
        });
    }
};



const postUsuario = async(req, res) => {

    //extraer la contrasena del body, en resto guardamos los datos del usuario con spread operator

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



const putUsuario = async(req, res) => {
    try {
        const usuario = await Usuario.findOneAndUpdate({ _id: req.params._id }, {...req.body }, { new: true });
        return res.status(200).json({
            code: "Ok get",
            message: null,
            success: true,
            data: usuario
        });
    } catch (error) {
        return res.status(500).json({
            code: "ERR",
            message: error.message,
            success: false,
            data: null
        });
    }
};


const deleteUsuario = async(req, res) => {
    try {
        await Usuario.deleteOne({ _id: req.params._id });
        return res.status(200).json({
            code: "Ok delete",
            message: null,
            success: true,
            data: null
        });
    } catch (error) {
        res.status(500).json({
            code: "ERR",
            message: error.message,
            success: false,
            data: null
        });
    };
};


// const getUsuarios = (req, res) => {
//     res.send(usuarios);
// }

// const getUsuario = (req, res) => {
//     const { id } = req.params;
//     const usuario = usuarios.find(u => u.id === Number(id));
//     if (!usuario) {
//         return res.status(404).send({ mensaje: `No se encontro el usuario` })
//     }
// }

// const postUsuarios = (req, res) => {
//     const { id, nombre } = req.body;
//     const usuario = { id, nombre }
//     usuarios.push(usuario)
//     return res.send(usuarios)
// }

// const putUsuario = (req, res) => {
//     const { id } = req.params;
//     const { nombre } = req.body;
//     const usuario = usuarios.find(u => u.id === Number(id));
//     if (!usuario) {
//         return res.status(404).send({ mensaje: `No se encontro el usuario` })
//     }
//     usuario.nombre = nombre;
//     return res.send(usuario)
// }

// const deleteUsuario = (req, res) => {
//     const { id } = req.prams;
//     const indez = usuarios.findIndex(u => u.id === Number(id));
//     if (index < 0) {
//         return res.status(404).send();
//     }
//     usuarios.splice(index, 1);
//     return res.status(200).send();
// }

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
    getAllUsuarios
};