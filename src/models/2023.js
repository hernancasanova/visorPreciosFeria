const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Prices2023Schema = new Schema({
    type: String,
    date: String,
    price: String
  });
  
  
  module.exports = mongoose.model('2023', Prices2023Schema);
  