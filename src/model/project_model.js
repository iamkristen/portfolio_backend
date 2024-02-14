const {model,Schema} = require("mongoose")

const project = new Schema({
    "banner":{type:String, required:true},
    "projectType":{type:String, required:true},
    "title":{type:String, required:true},
    "description":{type:String, required:true},
})

module.exports = model("project",project)