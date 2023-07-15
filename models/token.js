const mongoose = require("mongoose");

// Definimos el esquema del modelo Token
const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Creamos el modelo Token a partir del esquema
const Token = mongoose.model("Token", tokenSchema);

// Exportamos el modelo Token
module.exports = Token;