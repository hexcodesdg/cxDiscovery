// @flow weak
const mongoose = require("mongoose");
const tagConstants = require("./tagConstants");

const ClickSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now, required: true},
    user_id: {type: Number, required: true},
    ad_id: {type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true}
});

const Click = mongoose.model("Click", ClickSchema);
module.exports = Click;
