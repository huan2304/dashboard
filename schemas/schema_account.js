const mongoose = require('mongoose');
const Schema_account = new mongoose.Schema({
    username: String,
    password: String,
    ten: String,
  });

module.exports = Schema_account;