const {model,Schema} = require("mongoose")

const skills = new Schema({
    "type":{type:String,required:true},
    "title":{type:String, required:true},
    "level":{type:String, required:true},
})

module.exports = model("skills",skills)