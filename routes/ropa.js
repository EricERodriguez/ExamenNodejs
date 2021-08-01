const { Router } = require(`express`);
const router = Router();



const {
    getRopa,
    postRopa,
    putRopa,
    deleteRopa,
    getAllRopas,
} = require(`../controllers/ropa`)


//validaciones
const {
    validarIdParamRopa,
    validarPostRopa,
    validarPutRopa,

} = require(`../middlewares/validar-ropa`)

router.get(`/`, getAllRopas)

router.get(`/:_id`, validarIdParamRopa, getRopa)

router.post(`/`, validarPostRopa, postRopa)

router.put(`/:_id`, validarIdParamRopa, validarPutRopa, putRopa)

router.delete(`/:_id`, validarIdParamRopa, deleteRopa)

module.exports = router;