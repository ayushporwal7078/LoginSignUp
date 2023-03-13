const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
firstName : {
    type : String,
    required : true,
},
lastName : {
    type : String,
    required : true,
},
mobileNumber : {
  type : Number,
  required : true,
},
State : {
    type : String,
    required : true,
},
city : {
    type : String,
    required : true,
},
gender : {
    type : String,
    required : true,
},
Password : {
    type : String,
    required : true,
}
})

const  User = mongoose.model('User', UserSchema);
module.exports = User