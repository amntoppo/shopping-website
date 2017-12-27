var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  email:{
    type: String,
    require: true
  },
  password: {
    type:String,
    require: true
  }
});

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports  = mongoose.model('userData', userSchema);
