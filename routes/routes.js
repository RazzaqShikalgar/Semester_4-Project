const express = require('express');
const app = express();
const route = express.Router();
const mongoose = require('mongoose');


// route.get("/", function(req,res){
//     const name = "here";
//     res.render("list", {webname:name})
//  });
 route.get("/login",function(req,res){
  res.render("login");
 });
 
 route.get("/signup",function(req,res){
  res.render("register");
 });
 route.get("/review",function(req,res){
  res.render("card");
 });
 //Login & Signup
 
const userSchema = {
    fname:String,
    lname:String,
    email:String,
    password:String,
    rpassword:String
  };
  
  const User = new mongoose.model("User", userSchema);
  
  
   route.post("/signup",function(req,res){
    const newUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email:req.body.email,
      password:req.body.password,
      rpassword:req.body.rpassword
    });
    newUser.save(function(err){
      if(err){
        console.log(err);
      } else {
        res.render("login");
      }
    });
  });
  
  route.post("/login", function(req,res){
    const username = req.body.email;
    const password = req.body.password;
    User.findOne({email:username},function(err,foundUser){
      if(err){
        console.log(err);
      } else{
        if(foundUser){
          if(foundUser.password === password){
            // res.render("list");
            res.redirect("/");
            // alert("Successfully Logged in");
          } else{
            console.log(err);
          }
        }
      }
    });
  });

// Login Signup  
module.exports = route;