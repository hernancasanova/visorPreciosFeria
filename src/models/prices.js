const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PriceSchema = new Schema({
    type: String,
    date: String,
    price: String
  });
  
  
  module.exports = mongoose.model('2021', PriceSchema);
  