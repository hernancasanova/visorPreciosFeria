const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Prices2022Schema = new Schema({
    type: String,
    date: String,
    price: String
  });
  
  
  module.exports = mongoose.model('2022', Prices2022Schema);
  