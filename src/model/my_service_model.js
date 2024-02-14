const {model,Schema} = require("mongoose");


const myService = new Schema({
    "icon": {type:String, required:true},
    "title":{type:String, required:true},
    "description": {type:String, required:true},
})

module.exports = model("myService", myService);