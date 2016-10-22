// @flow weak
const mongoose = require("mongoose");
const tagConstants = require("./tagConstants");

const AdSchema = new mongoose.Schema({
    image_url: {type: String, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    tags: {type: [String], enum: tagConstants, required: true},
    vendor_url: {type: String},
    reward: {type: String}
});

const Ad = mongoose.model("Ad", AdSchema);
module.exports = Ad;
