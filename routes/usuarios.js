const { Router } = require(`express`);
const router = Router();


const {
    getUsuario,
    // postUsuario,
    putUsuario,
    deleteUsuario,
    getAllUsuarios,
} = require(`../controllers/usuarios`);
const { validateRoles } = require("../middlewares/validar-auth");


//validaciones
const {
    validarIdParamUsuario,
    validarPostUsuario,
    validarPutUsuario,

} = require(`../middlewares/validar-usuarios`)

router.get(`/`, validateRoles("ADMIN"), getAllUsuarios)

router.get(`/:_id`, validarIdParamUsuario, getUsuario)

// router.post(`/`, validarPostUsuario, postUsuario)

router.put(`/:_id`, [validateRoles("ADMIN"), validarIdParamUsuario, validarPutUsuario], putUsuario)

router.delete(`/:_id`, [validateRoles("ADMIN"), validarIdParamUsuario], deleteUsuario)

module.exports = router;