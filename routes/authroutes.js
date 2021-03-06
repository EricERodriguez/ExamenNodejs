const { Router } = require(`express`);
const router = Router();

//controlador
const {
    login
    //lo importa de
} = require(`../controllers/auth.controller`);

//controlador
const {
    registro
    //lo importa de
} = require(`../controllers/auth.controller`);

const {
    validateLogin
    //lo importa de
} = require(`../middlewares/validar-auth`);

//los login siempre son de tipo post
router.post("/login", login);
router.post("/registro", registro);


module.exports = router;