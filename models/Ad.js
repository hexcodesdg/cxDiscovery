const mongoose = require("mongoose")
const adSchema = new mongoose.Schema({
    image_url: {type: String, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    tags: {type: String, enum:[''], required: true},
    vendor: {type: [String], required: true},
    reward: {type: String}
})

const Ad = mongoose.model("Ad", adSchema)
module.exports = Ad
