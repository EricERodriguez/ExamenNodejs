const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    roles: [{
        type: String,
        require: true,
        enum: ["ADMIN",
            "EMPLOYER",
            "USER"
        ]
    }]
}, {
    timestamps: true
});

module.exports = model("Usuario", UsuarioSchema);