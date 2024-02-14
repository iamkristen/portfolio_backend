const {model,Schema} = require("mongoose")

const experience = new Schema({
    "timePeriod": {type: String, required:true},
    "title":{type:String, required:true},
    "company":{type:String, required:true},
    "description":{type:String, required:true},
})
module.exports = model("experience", experience);