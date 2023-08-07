var express = require('express');
var router = express.Router();
const { default: mongoose } = require('mongoose');
var uploadHelper = require('../helper/helper-upload');
var model_file = require('./../models/model_file');

var module_mail = require('./../helper/helper-mailer');
var schema_emailgiaovien = require('./../schemas/schema_emailgiaovien');
const { unlink } = require('fs');
const model_emailgiaovien = new mongoose.model("model_emailgiaovien", schema_emailgiaovien, "emailgiaovien");

/* GET home page. */
router.get('/mailer/cham-cong', async function(req, res, next) {
  
  res.render('pages/backend/form-mailer-chamcong', {});
});

router.post('/mailer/cham-cong/submit', uploadHelper.uploadSingle('file', 'cham-cong', 5), async function(req, res, next) {
  let chamcong = model_file.csvToJSON(path_base + '\\upload\\cham-cong\\ChamCongOutput.csv','ngay','truong','lop','gv','thoigian','thoiluong');
  let listemail = [];
  listemail = await model_emailgiaovien.find({});
  let log = '';
  let coEmail = 0;
  let chamconggv = [];
  let htmlmail = `<table style="border: 1px solid black; border-collapse: collapse; width: 50%; ">
  <tr style="border: 1px solid black; border-collapse: collapse;background-color: antiquewhite">
    <th style="border: 1px solid black; border-collapse: collapse;">Ngày</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Họ và tên</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Lớp</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Thời gian</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Số phút</th>
  </tr>`;
  let mailrecive = '';
  var T = module_mail.transporter('admin@stemtruck.vn', '5n28m4hWX5');
  var mailOptions = {};

  for (let i=0; i<chamcong.length; i++){
    for (let j=0; j<listemail.length; j++){
        if (chamcong[i].gv == listemail[j].ten) coEmail = 1;
    }
    if (coEmail == 0) log += chamcong[i].gv + ' chưa có email.\n';
    else coEmail = 0;
  }
  for (let i=0; i<chamcong.length; i++)
    if(!chamconggv.includes(chamcong[i].gv)) chamconggv.push(chamcong[i].gv)
  if (log == undefined || log ==  ''){
    console.log('OK');
    for (let i=0; i<chamconggv.length; i++){
      for (let j=0; j<chamcong.length; j++){
        if (chamcong[j].gv == chamconggv[i]){
          htmlmail += `<tr style="border: 1px solid black; border-collapse: collapse;">
          <td style="border: 1px solid black; border-collapse: collapse;">` + chamcong[j].ngay + `</td>
          <td style="border: 1px solid black; border-collapse: collapse;">` + chamcong[j].gv + `</td>
          <td style="border: 1px solid black; border-collapse: collapse;">` + chamcong[j].lop + `</td>
          <td style="border: 1px solid black; border-collapse: collapse;">` + chamcong[j].thoigian + `</td>
          <td style="border: 1px solid black; border-collapse: collapse;">` + chamcong[j].thoiluong + `</td>
          </tr>`;
        }
      }
      htmlmail += `</table>`;

      
      for (let j=0; j<listemail.length; j++){
        if (chamconggv[i] == listemail[j].ten) mailrecive = listemail[j].email;
      }
      mailOptions = {
        from: 'admin@stemtruck.vn',
        to: mailrecive,
        subject: 'Chấm công Kidkul',
        html: htmlmail
      };
      // T.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });
      mailOptions = {};

      htmlmail = `<table style="border: 1px solid black; border-collapse: collapse; width: 50%; ">
        <tr style="border: 1px solid black; border-collapse: collapse;background-color: antiquewhite">
          <th style="border: 1px solid black; border-collapse: collapse;">Ngày</th>
          <th style="border: 1px solid black; border-collapse: collapse;">Họ và tên</th>
          <th style="border: 1px solid black; border-collapse: collapse;">Lớp</th>
          <th style="border: 1px solid black; border-collapse: collapse;">Thời gian</th>
          <th style="border: 1px solid black; border-collapse: collapse;">Số phút</th>
        </tr>`;
    }
  }
  else console.log(log);

  unlink(path_base + '\\upload\\cham-cong\\ChamCongOutput.csv', (err) => {
    if (err) throw err;
    console.log('xoa cham cong thanh cong');
  })
  res.redirect('/tool/mailer/cham-cong');
})


module.exports = router;
