const {model,Schema} = require("mongoose")

const socialLinks = new Schema({
    "icon":{type:String, required:true},
    "name":{type:String, required:true},
    "link":{type:String, required:true},
})

module.exports = model("socialLinks",socialLinks);
