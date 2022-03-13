const { Schema, model } = require("mongoose");

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    login: String,
    dateCreated: Date,
});

module.exports = model("User", schema);