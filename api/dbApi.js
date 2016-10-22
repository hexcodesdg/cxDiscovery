// @flow weak
var models = require('../models');
var tagConstants = require('../models/tagConstants');

/*
* Creates new save record
*/
function postSaveRecord(userId, ad_id) {
    models.Save.create({
        user_id: userId,
        ad_id
    })
}

/*
* Get Ads by User Id
*/
function getAdsByUserId(userId, limit, offset, callback){
  let tags = [];
  limit = limit ? limit : 20
  offset = offset ? offset : 0
  if(userId === null) callback(new Error('userId cannot be null'), null);
  getUserById(userId, function(err, result){
      if(err) callback(err, null);
      else if(!result) {
          callback(new Error("User not found"), null)
      } else {
          let query = {}
        //   if (result.fav_tags.length > 0) {
        //       query = {tags: {$in: result.fav_tags}}
        //   }
        //   console.log(query)
          models.Ad.find(query).skip(offset).limit(limit).exec(function(err, result){
            console.log(result); 
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
  models.Ad.find({}).skip(offset).limit(limit).exec(function(err, result){
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
      const ids = result.saved_ads;
      models.Ad.find({_id: {$in: ids}}).skip(offset).limit(limit).exec(function(err, result){
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
function setUserSavedAds(userId, saved_ad, callback){
  if(userId === null) callback(new Error('userId cannot be null'), null);
  models.User.findOne({id: userId}, function(err, user) {
      if(err) callback(err, null)
      else if (!user) callback(new Error("user not found"), null)
      else {
          const index = user.saved_ads.indexOf(saved_ad)
          if (index === -1) {
              postSaveRecord(userId, saved_ad)
              models.User.findOneAndUpdate({id: userId}, {$push: {saved_ads: saved_ad}}, function(err, newUser) {
                  if (err) callback(err, null)
                  else callback(null, newUser)
              })
          } else {
              models.User.findOneAndUpdate({id: userId}, {$pull: {saved_ads: saved_ad}}, function(err, newUser) {
                  if (err) callback(err, null)
                  else callback(null, newUser)
              })
          }
      }
  })
}

/*
* Set User's Favorite Tags by their Ids
*/
function setUserFavTags(userId, fav_tag, callback){
  if(userId === null) callback(new Error('userId cannot be null'), null);
  models.User.findOne({id: userId}, function(err, user) {
      if(err) callback(err, null)
      else if (!user) callback(new Error("user not found"), null)
      else {
          const index = user.fav_tags.indexOf(fav_tag)
          if (index === -1) {
              models.User.findOneAndUpdate({id: userId}, {$push: {fav_tags: fav_tag}}, function(err, newUser) {
                  if (err) callback(err, null)
                  else callback(null, newUser)
              })
          } else {
              models.User.findOneAndUpdate({id: userId}, {$pull: {fav_tags: fav_tag}}, function(err, newUser) {
                  if (err) callback(err, null)
                  else callback(null, newUser)
              })
          }
      }
  })
}

/*
* Get all Tags
*/
function getAllTags(){
  return tagConstants;
}



/*
* Creates new click record
*/
function postClickRecord(userId, ad_id, cb) {
    models.Click.create({
        user_id: userId,
        ad_id
    }, (err, click) => {
        if (err) cb(err, null)
        else {
            cb(null, click)
        }
    });
}

/*
* Creates new read record
*/
function postReadRecord(userId, ad_id, cb) {
    models.Read.create({
        user_id: userId,
        ad_id
    }, (err, read) => {
        if (err) cb(err, null)
        else {
            cb(null, read)
        }
    });
}

// Module exports
module.exports.getAdsByUserId = getAdsByUserId;
module.exports.getAdsByTags = getAdsByTags;
module.exports.getSavedAdsByUserId = getSavedAdsByUserId;
module.exports.getUserById = getUserById;
module.exports.setUserSavedAds = setUserSavedAds;
module.exports.setUserFavTags = setUserFavTags;
module.exports.getAllTags = getAllTags;
module.exports.postReadRecord = postReadRecord
module.exports.postClickRecord = postClickRecord
