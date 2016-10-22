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

module.exports = router;
