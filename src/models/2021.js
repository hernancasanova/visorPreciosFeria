const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Price2021Schema = new Schema({
    type: String,
    date: String,
    price: String
  });
  
  
  module.exports = mongoose.model('2021', Price2021Schema);
  