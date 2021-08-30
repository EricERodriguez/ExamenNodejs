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
        require: true
    },
    precio: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    linkImage: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = model("Ropa", RopaSchema);