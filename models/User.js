// @flow weak
const mongoose = require("mongoose");
const tagConstants = require("./tagConstants");

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    frequent_flier_id: {type: Number, required: true},
    nationality: {type: String, required: true},
    gender: {type: String, enum: ['Male', 'Female'], required: true},
    email: {type: String, required: true},
    fav_tags: {type: String, enum: tagConstants, required: true},
    saved_ads: {type: mongoose.Schema.Types.ObjectId, ref: 'Ad'}
})

const User = mongoose.model("User", UserSchema);
module.exports = User;
