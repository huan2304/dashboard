var express = require('express');
var router = express.Router();
var uploadHelper = require('./../helper/helper-upload');
const { unlink } = require('fs');
const { default: mongoose } = require('mongoose');
var model_file = require('./../models/model_file');
var schema_emailgiaovien = require('./../schemas/schema_emailgiaovien');

const model_emailgiaovien = new mongoose.model("model_emailgiaovien", schema_emailgiaovien, "emailgiaovien");

/* GET home page. */
router.get('/import-email-giaovien', function(req, res, next) {
  res.render('pages/backend/form-import-gv');
});

router.post('/upload/email', uploadHelper.uploadSingle('file', 'email', 5), async function(req, res, next) {
  let arr = [];
  arr = model_file.csvToJSON('email/email.csv','ten', 'email');
  let listemail = [];
  listemail = await model_emailgiaovien.find({});
  let trungnhau = 0;
  let thaydoi = 0;
  for (let i=0; i<arr.length; i++){
    for (let j=0; j<listemail.length; j++){
      if (arr[i].ten == listemail[j].ten && arr[i].email == listemail[j].email) {
        trungnhau = 1;
        break;
      }
      else if (arr[i].ten == listemail[j].ten) {
        thaydoi = 1;
        break;
      }
    }
    if (trungnhau == 1) {
      trungnhau = 0;
      continue;
    }
    // cap nhat email
    if (thaydoi == 1) {
      model_emailgiaovien.updateOne({ten: arr[i].ten}, {email: arr[i].email});
      thaydoi = 0;
    }
    else {
      let email = new model_emailgiaovien({ten: arr[i].ten, email: arr[i].email});
      email.save();
    }    
    
  }
  unlink('upload/email/email.csv', (err => {
    if (err) console.log('xoa file email khong thanh cong');
    else console.log('xoa file email thanh cong');
  }));
  res.redirect('/giaovien/danh-sach-email');
})

module.exports = router;
