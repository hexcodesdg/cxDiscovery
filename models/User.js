const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    frequent_flier_Id: {type: Number, required: true},
    nationality: {type: String, required: true},
    gender: {type: String, enum: ['Male', 'Female'], required: true},
    email: {type: String, required: true},
    fav_tags: {type: String, enum:[''], required: true},
    saved_ads: {type: [String]}
})

const User = mongoose.model("User", userSchema)
module.exports = User
