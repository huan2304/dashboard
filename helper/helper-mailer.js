var nodemailer = require('nodemailer');

function createTrans(email, pass){
  return nodemailer.createTransport({
    host: "mail.stemtruck.vn",
    port: 25,
    rejectUnauthorized: false,
    ignoreTLS: true,
    secure: true,
    auth: {
      user: email,
      pass: pass
    }
  })
}

module.exports = {
  transporter: createTrans
}
