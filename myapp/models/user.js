var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    email: {type: String, required:true},
    password: {type: String, required:true},
    nickname : {type:String},
});




var User = mongoose.model('User',userSchema);




module.exports= User;