const mongoose = require('mongoose');
const Schema_account = new mongoose.Schema({
    ten: String,
    email: String,
  });

module.exports = Schema_account;