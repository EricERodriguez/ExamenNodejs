require(`dotenv`).config();
const express = require("express");
const morgan = require("morgan");


//guardar logs y verificar que este andando el programa
const fs = require(`fs`);
const path = require(`path`);

//Rutas
const rutasUsuarios = require(`./routes/usuarios`);
const rutasRopa = require(`./routes/ropa`);

const authRoutes = require(`./routes/authroutes`);

//middleware token
const { validateToken } = require("./middlewares/validar-auth");



const dbConnection = require("./configs/mongodb");


const app = express();

//conectar a la base de datos

dbConnection();

app.use(express.text());
app.use(express.json());

//uso el token del middle
// app.use(validateToken);

//Utilizando morgan y manipulando archivos
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"), {
        flags: "a",
    }
);

app.use(morgan('tiny', { stream: accessLogStream }));

app.use(`/usuarios`, validateToken, rutasUsuarios);
app.use(`/ropa`, validateToken, rutasRopa);

app.use(`/auth`, authRoutes);

app.use((req, res, next) => {
    res.status(404).send({ mensaje: "ERROR, no existe la ruta a la que quiere acceder" })
});


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`servidor corriendo en el ${port}`)
});