const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: false
    },
    apellido: {
        type: String,
        require: false
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    roles: {
        type: String,
        require: false,
        enum: ["ADMIN",
            "EMPLOYER",
            "USER"
        ]
    }
}, {
    timestamps: true
});

//para borrar la contrasena que se envia por pantalla - el thisObject lo parsea sin  ningun methodo de mongoose
UsuarioSchema.methods.toJSON = function() {
    const { password, ...usuario } = this.toObject()
    return usuario;
}

module.exports = model("Usuario", UsuarioSchema);