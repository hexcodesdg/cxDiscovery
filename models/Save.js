// @flow weak
const mongoose = require("mongoose");
const tagConstants = require("./tagConstants");

const SaveSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now, required: true},
    user_id: {type: Number, required: true},
    ad_id: {type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true}
});

const Save = mongoose.model("Save", SaveSchema);
module.exports = Save
