const express = require('express');
const app = express();
const route = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require("passport");
// const saltRound=10;
// const encrypt = require("mongoose-encryption");
//models
const User = require("../models/signup.js");


// route.get("/", function(req,res){
//     const name = "here";
//     res.render("list", {webname:name,message:''})
//  });
 route.get("/login",function(req,res){
  res.render("register",{message:''});
 });
 
 route.get("/signup",function(req,res){
  res.render("register",{message:''});
 });
 route.get("/review",function(req,res){
  res.render("card");
 });
//  route.get("/secrets",function(req,res){
//   res.render("secrets");
//  });
 route.get("/secrets",function(req,res){
  if (req.isAuthenticated()){
    res.render("secrets");
  } else{
    res.redirect("/");
  }
 });

 //Login & Signup
// const userSchema =new mongoose.Schema ({
//     fname:String,
//     lname:String,
//     email:String,
//     password:String,
//     rpassword:String
//   });
  // const secret = "Thisisourlittlesecret.";
  // userSchema.plugin(encrypt, {secret: secret , encryptedFields: ["password" ,"rpassword"]});
  // const User = new mongoose.model("User", userSchema);
  
  
  //  route.post("/signup",function(req,res){
  //   const newUser = new User({
  //     fname: req.body.fname,
  //     lname: req.body.lname,
  //     email:req.body.email,
  //     password:req.body.password,
  //     rpassword:req.body.rpassword
  //   });
  //   newUser.save(function(err){
  //     if(err){
  //       console.log(err);
  //     } else {
  //       res.render("login");
  //     }
  //   });
  // });

// Login Signup  
module.exports = route;

route.post("/signup", async (req, res) => {
    // Checking that user filled in all fielddfbs
  const { name,email, phone, password, cpassword } = req.body; 

  if (!name || !email || !phone || !password || !cpassword) {
    return res.render("register", {message: "Please fill in all fields"});
  }else if(password !== cpassword) {
    return res.render("register", {message: "Passwords do not match"});
  } else if(phone.length !== 10){
  return res.render("register", {message: "Please enter a valid phone number"});
  }
else{

  try {
    // Checking user exists or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.render('register',{ message: "mail registred"});
    }
    // At the end creating a new user
    const newUser = new User({ name, email,phone, password , cpassword });
    const createUser = await newUser.save();
    if (createUser) {
      // console.log(md5('password'));
     return  res.render('register',{ message: "user created" });
    }
  } catch (err) {
    console.log(err);
  }
}

});


//Login Page
route.post("/login", function(req,res){
  const username = req.body.email;
  const password = req.body.password;
  User.findOne({email:username},function(err,foundUser){
    if(err){
      console.log(err);
    } else{
      if(foundUser){
       bcrypt.compare(password,foundUser.password,function(err,result){
        if(result==true) {
          return  res.render("register",{message:'Logged in successfully'});
        }
        else{
          return res.render("register",{message:'Something went wrong'});
        }
       });
        
      }
      else {
        return res.render("register",{message:'Something went wrong'});
      }
    }
  });
});
//session login
route.post("/login",function(req,res){
User.register({email:req.body.email},req.body.password,function(err,user){
  if(err){
    console.log(err);
    res.redirect("/");
  } else{
    passport.authenticate("local")(req,res,function(){
      res.redirect("/secrets");
    });
  }
});
});
//session login
module.exports = route;