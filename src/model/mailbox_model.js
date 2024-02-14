const {model,Schema} = require("mongoose")

const mailBox = new Schema({
    "fullName":{type:String , required:true},
    "email":{type:String, required: true},
    "message": {type:String, required: true},
},{
    timestamps:true
})

module.exports = model("mailbox", mailBox);