var express = require('express');
var router = express.Router();
var file = require('./../models/model_file');

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log(path_base);
  res.render('pages/backend/index');
});

router.use('/form', require('./form'));
router.use('/giaovien', require('./giaovien'));
router.use('/tool', require('./tool'));

module.exports = router;
