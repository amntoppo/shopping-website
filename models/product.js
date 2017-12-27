var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema  = mongoose.Schema({
  imagePath:{type: String, require: true},
  title:{type:String, require:true},
  description:{type:String, require:true},
  price:{type:Number, require:true}

});

const productModel = mongoose.model('product', schema);

module.exports = productModel ;
