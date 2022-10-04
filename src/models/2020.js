const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Prices2020Schema = new Schema({
    type: String,
    date: String,
    price: String
  });
  
  
  module.exports = mongoose.model('2020', Prices2020Schema);
  