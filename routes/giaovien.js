var express = require('express');
var router = express.Router();
const { default: mongoose } = require('mongoose');
var uploadHelper = require('../helper/helper-upload');

var schema_emailgiaovien = require('./../schemas/schema_emailgiaovien');
const model_emailgiaovien = new mongoose.model("model_emailgiaovien", schema_emailgiaovien, "emailgiaovien");

/* GET home page. */
router.get('/danh-sach-email', async function(req, res, next) {
  let listemail = [];
  listemail = await model_emailgiaovien.find({});
  res.render('pages/backend/danhsachemail', {listemail});
});


module.exports = router;
