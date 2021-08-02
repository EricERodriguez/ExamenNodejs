# PracticoExpress NodeJS <img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" alt="babel" width="40" height="40"/>

## Examen nodeJS

Se requiere crear una API Restful, la cual debe implementar dos CRUDs sobre las siguientes colecciones de MongoDB:
<pre>
<code>
//------------------------- USUARIOS
{
    _id: ObjectId,
    nombre: String,
    apellido: String,
    password: String,
    email: String,
    rol: String (puede ser ADMIN, EMPLOYER o USER)
}


//------------------------- ROPA
{
    _id: ObjectId,
    tipo: String, (puede ser buzo, remera, campera, pantalón)
    cantidad: Number,
    precio: Number,
    descripcion: String
}

Debe existir un Login y un Registro de usuarios.


Se debe considerar:
POST registro (sin validación de token ni rol)  (completed)
POST login (sin validación de token ni rol)     (completed)

PUT usuario (se debe validar que el usuario a modificar sea el dueño del token o que el usuario del token sea de rol ADMINISTRADOR)
GET usuario (se debe validar que el usuario a obtener sea el dueño del token o que el usuario
del token  sea de rol ADMINISTRADOR)
DELETE usuario (se debe validar que el usuario a modificar sea el dueño del token o que el usuario
del token sea de rol ADMINISTRADOR)

POST ropa (se debe validar que el dueño del token sea de rol ADMINISTRADOR o EMPLEADO)
GET ropa (cualquiera que tenga token)
PUT ropa (se debe validar que el dueño del token sea de rol ADMINISTRADOR o EMPLEADO)
DELETE ropa (se debe validar que el dueño del token sea de rol ADMINISTRADOR o EMPLEADO )
</code></pre>

Para instalar todas las dependecias
<pre>
<code>npm install</code></pre>

Para ejecutar en local
<pre>
<code>npm start</code></pre>



## Dependencias utilizadas
<pre>
<code>npm i express
npm i dotenv
npm i morgan
npm i joi
npm i nodemon

npm install mongoose

npm i jsonwebtoken
https://jwt.io/


</code></pre>
