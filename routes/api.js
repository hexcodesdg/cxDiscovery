// @flow weak

const router = require("express").Router();
const db = require('../api/dbApi');


router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy"
    });
});

router.get("/ads", (req, res, next) => {
  const limit = (req.query.limit === null) ? 0 : req.query.limit;
  const offset = (req.query.offset === null) ? 0 : req.query.offset;
  if(req.query.user_id){
    db.getAdsByUserId(req.query.user_id, limit, offset, function(err, result){
      if (err) next(err)
      else {
          res.json({
              success: true,
              data: result
          });
      }
    });
  }
  else if(req.query.tags){
    db.getAdsByTags(req.query.tags, limit, offset, function(err, result){
      if(err) next(err);
      res.json({
          success: true,
          data: result
      });
    });
  }
  else {
    res.json({success: false, message: 'failed to locate ads'});
  }
});

/*
* Serves list of all tags
*/
router.get("/tags", (req, res) => {
  res.json(db.getAllTags());
});

/*
* Serves user through their Id
*/
router.get("/user", (req, res) => {
  if(req.query.user_id) {
    db.getUserById(req.query.user_id, function(err, result){
      if(err) res.end(err);
      else {
          res.json({
              success: true,
              data: result
          });
      }
    });
  }
  else {
    res.json({success: false, message: 'user_id should be provided'});
  }
});


/*
* Serves a user's saved Ads through their user Id
*/
router.get("/user/:userId/saved_ads", (req, res, next) => {
  const limit = (req.query.limit === null) ? 0 : req.query.limit;
  const offset = (req.query.offset === null) ? 0 : req.query.offset;
  const userId = req.params.userId
  if (userId) {
    db.getSavedAdsByUserId(userId, limit, offset, function(err, result){
      if(err) next(err)
      else {
          res.json({
              success: true,
              data: result
          });
      }
    });
  }
  else {
    res.json({success: false, message: 'user_id should be provided'});
  }
});


/*
* saves a user's saved Ads through their user Id
*/
router.post("/ads", (req, res, next) => {
  if(req.body.user_id && req.body.saved_ad){
    db.setUserSavedAds(req.body.user_id, req.body.saved_ad, function(err, result){
      if(err) next(err);
      else {
          res.json({
              success: true,
              data: result
          });
      }
    });
  }
  else {
    res.json({success: false, message: 'user_id and saved_ad should be provided'});
  }
});


/*
* saves a user's favorite tags through their user Id
*/
router.post("/tags", (req, res, next) => {
  if(req.body.user_id && req.body.fav_tag){
    db.setUserFavTags(req.body.user_id, req.body.fav_tag, function(err, result){
      if(err) next(err);
      else {
          res.json({
              success: true,
              data: result
          });
      }
    });
  }
  else {
    res.json({success: false, message: 'user_id and fav_tags should be provided'});
  }
});


router.post("/read/:userId", (req, res, next) => {
    if (req.body.ad_id) {
        db.postReadRecord(req.params.userId, req.body.ad_id, function(err, result) {
            if (err) next(err)
            else {
                res.json({
                    success: true,
                    data: result
                })
            }
        })
    } else {
        res.json({
            success: false,
            message: "please enter in ad_id"
        })
    }
});

router.post("/click/:userId", (req, res, next) => {
    if (req.body.ad_id) {
        db.postClickRecord(req.params.userId, req.body.ad_id, function(err, result) {
            if (err) next(err)
            else {
                res.json({
                    success: true,
                    data: result
                })
            }
        })
    } else {
        res.json({
            success: false,
            message: "please enter in ad_id"
        })
    }
});

module.exports = router;
