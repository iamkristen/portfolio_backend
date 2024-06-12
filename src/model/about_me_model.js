const { model, Schema } = require("mongoose");

const aboutMeSchema = new Schema({
  avatar: { type: String },
  name: { type: String, required: true },
  profession: { type: Array, required: true },
  description: { type: String, required: true },
  age: { type: Number, required: true },
  residence: { type: String, required: true },
  freelance: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = model("aboutMe", aboutMeSchema);
