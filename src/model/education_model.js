const { model, Schema } = require("mongoose");

const education = new Schema({
  timePeriod: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = model("education", education);
