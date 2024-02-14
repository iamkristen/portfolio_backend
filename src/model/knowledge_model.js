const {model,Schema} = require("mongoose")

const knowledge = new Schema({
    "title":{type:String, required:true},
})

module.exports = model("knowledge",knowledge)