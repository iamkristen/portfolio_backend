const {model,Schema} = require("mongoose")


const contactMe = new Schema({
    "address":{type:String, required:true},
    "email":{type:String, required:true},
    "phone": {type:String, required: true},
    "freelance":{type:String,required:true},
    "openTo":{type:String, required:true},
})

module.exports = model("contactMe",contactMe);