const { Router } = require(`express`);
const router = Router();



const {
    getRopa,
    postRopa,
    putRopa,
    deleteRopa,
    getAllRopas,
} = require(`../controllers/ropa`);
const { validateRoles } = require("../middlewares/validar-auth");


//validaciones
const {
    validarIdParamRopa,
    validarPostRopa,
    validarPutRopa,

} = require(`../middlewares/validar-ropa`)

router.get(`/`, getAllRopas)

router.get(`/:_id`, validarIdParamRopa, getRopa)

router.post(`/`, [validateRoles("ADMIN", "EMPLOYER"), validarPostRopa], postRopa)

router.put(`/:_id`, [validateRoles("ADMIN", "EMPLOYER"), validarIdParamRopa, validarPutRopa], putRopa)

router.delete(`/:_id`, [validateRoles("ADMIN", "EMPLOYER"), validarIdParamRopa], deleteRopa)

module.exports = router;