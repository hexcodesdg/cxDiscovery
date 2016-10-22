// @flow weak
const mongoose = require("mongoose");
const tagConstants = require("./tagConstants");

const ReadSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now, required: true},
    user_id: {type: Number, required: true},
    ad_id: {type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true}
});

const Read = mongoose.model("Read", ReadSchema);
module.exports = Read;
