const { Schema, model } = require("mongoose");

const RopaSchema = Schema({
    tipo: [{
        type: String,
        require: true,
        enum: ["BUZO",
            "REMERA",
            "CAMPERA"
        ]
    }],
    cantidad: {
        type: Number,
        require: false
    },
    precio: {
        type: Number,
        require: false
    },
    descripcion: {
        type: String,
        require: false
    },
    linkImage: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = model("Ropa", RopaSchema);