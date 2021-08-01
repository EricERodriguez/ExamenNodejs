const Ropa = require("../models/ropa");



const getAllRopas = async(req, res) => {

    //paginado

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skipIndex = (page - 1) * limit;


    try {
        const count = await Ropa.countDocuments();
        const results = await Ropa.find().sort({ _id: 1 }).limit(limit).skip(skipIndex);
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




const getRopa = async(req, res) => {
    try {
        const ropa = await Ropa.findById(req.params._id);
        if (!ropa) {
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
            data: ropa
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



const postRopa = async(req, res) => {
    try {
        const ropa = await Ropa.create(req.body);
        console.log(ropa);
        res.status(200).json({
            code: "Ok",
            message: null,
            success: true,
            data: ropa
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



const putRopa = async(req, res) => {
    try {
        const ropa = await Ropa.findOneAndUpdate({ _id: req.params._id }, {...req.body }, { new: true });
        return res.status(200).json({
            code: "Ok get",
            message: null,
            success: true,
            data: ropa
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


const deleteRopa = async(req, res) => {
    try {
        await Ropa.deleteOne({ _id: req.params._id });
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


// const getRopas = (req, res) => {
//     res.send(ropas);
// }

// const getRopa = (req, res) => {
//     const { id } = req.params;
//     const ropa = ropas.find(u => u.id === Number(id));
//     if (!ropa) {
//         return res.status(404).send({ mensaje: `No se encontro el ropa` })
//     }
// }

// const postRopas = (req, res) => {
//     const { id, nombre } = req.body;
//     const ropa = { id, nombre }
//     ropas.push(ropa)
//     return res.send(ropas)
// }

// const putRopa = (req, res) => {
//     const { id } = req.params;
//     const { nombre } = req.body;
//     const ropa = ropas.find(u => u.id === Number(id));
//     if (!ropa) {
//         return res.status(404).send({ mensaje: `No se encontro el ropa` })
//     }
//     ropa.nombre = nombre;
//     return res.send(ropa)
// }

// const deleteRopa = (req, res) => {
//     const { id } = req.prams;
//     const indez = ropas.findIndex(u => u.id === Number(id));
//     if (index < 0) {
//         return res.status(404).send();
//     }
//     ropas.splice(index, 1);
//     return res.status(200).send();
// }

module.exports = {
    getRopa,
    postRopa,
    putRopa,
    deleteRopa,
    getAllRopas
};