const mongoose = require('mongoose');
const encrypt = require("mongoose-encryption");
// const route = express.Router();
const userSchema =  new mongoose.Schema({
    name      : { type:String , required:true },
    
    email     : { type:String , required:true },
    
    phone     : { type:Number , required:true },
 
    password  : { type:String , required:true },

    cpassword : { type:String , required:true },

    tokens    : [{token:{ type:String,required:true}}]
});

const secret = "Thisisourlittlesecret.";
userSchema.plugin(encrypt, {secret: secret , encryptedFields: ["password" ,"cpassword"]});

module.exports = mongoose.model('User', userSchema);