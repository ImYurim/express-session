var mongoose = require('mongoose');
var uniqueArrayPlugin = require('mongoose-unique-array');


var userSchema = mongoose.Schema({
    email: {type: String, required:true},
    password: {type: String, required:true},
    nickname : {type:String},
});

userSchema.plugin(uniqueArrayPlugin);


var User = mongoose.model('User',userSchema);


module.exports= User;