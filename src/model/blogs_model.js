const {model,Schema} = require("mongoose")

const blogs = new Schema({
    "banner":{type:String, required:true},
    "projectType":{type:String, required:true},
    "title":{type:String, required:true},
    "description":{type:String, required:true},
},{
    timestamps:true
})

module.exports = model("blogs",blogs)