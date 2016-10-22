// @flow weak
var models = require('../models');
var tagConstants = require('../models/tagConstants');

/*
* Get Ads by User Id
*/
function getAdsByUserId(userId, limit, offset, callback){
  let tags = [];
  if(userId === null) callback(new Error('userId cannot be null'), null);
  getUserById(userId, function(err, result){
      if(err) callback(err, null);
      else if(!result) {
          callback(new Error("User not found"), null)
      } else {
          const tags = result.fav_tags;
          models.Ad.find({tags}).skip(offset).limit(limit).exec(function(err, result){
            if(err) callback(err, null);
            else {
                callback(null, result)
            }
        });
      }
  });
}

/*
* Get Ads by Tag Array
*/
function getAdsByTags(tags, limit, offset, callback){
  if(tags === null || offset === null || limit === null) callback(new Error('parameters cannot be null'), null);
  models.Ad.find({tags: tags}).skip(offset).limit(limit).exec(function(err, result){
    if(err) callback(err, null);
    callback(null, result);
  });
}

/*
* Get Saved Ads by User Id
*/
function getSavedAdsByUserId(userId, limit, offset, callback){
  let ids = [];
  if(userId === null) callback(new Error('userId cannot be null'), null);
  getUserById(userId, function(err, result){
      if(err) callback(err, null);
      else if(result.saved_ads === null || offset === null || limit === null) callback(err, null);
      ids = result.saved_ads;
      models.Ad.find({_id: ids}).skip(offset).limit(limit).exec(function(err, result){
        if(err) callback(err, null);
        callback(null, result);
      });
  });
}

/*
* Get User by their Ids
*/
function getUserById(userId, callback){
  if(userId === null) callback(new Error('userId cannot be null'), null);
  models.User.findOne({id: userId}).exec(function(err, result){
    if(err) callback(err, null);
    callback(null, result);
  });
}

/*
* Set User's Saved Ads by their Ids
*/
function setUserSavedAds(userId, saved_ads, callback){
  if(userId === null) callback(new Error('userId cannot be null'), null);
  models.User.findOneAndUpdate({id: userId}, {$set: {saved_ads: saved_ads}}, function(err, result) {
    if(err) callback(err, null);
    callback(null, result);
  });
}

/*
* Set User's Favorite Tags by their Ids
*/
function setUserFavTags(userId, fav_tags, callback){
  if(userId === null) callback(new Error('userId cannot be null'), null);
  models.User.findOneAndUpdate({id: userId}, {$set: {fav_tags: fav_tags}}, function(err, result) {
    if(err) callback(err, null);
    callback(null, result);
  });
}

/*
* Get all Tags
*/
function getAllTags(){
  return tagConstants;
}

// Module exports
module.exports.getAdsByUserId = getAdsByUserId;
module.exports.getAdsByTags = getAdsByTags;
module.exports.getSavedAdsByUserId = getSavedAdsByUserId;
module.exports.getUserById = getUserById;
module.exports.setUserSavedAds = setUserSavedAds;
module.exports.setUserFavTags = setUserFavTags;
module.exports.getAllTags = getAllTags;
