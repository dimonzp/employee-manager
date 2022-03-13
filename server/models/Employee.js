const { Schema, model } = require("mongoose");

const name = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    middleName: { type: String },
})

const schema = new Schema({
  name: { type: name, require: true },
  gender: String,
  contacts: [{ type: String }],
  salary: Number,
  position: String,
  updated: { type: Date, default: Date.now },
});

module.exports = model("Employee", schema);
