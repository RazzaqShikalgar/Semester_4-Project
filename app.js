
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb+srv://Razzaq:Razzaq%402003@cluster0.pysaqrm.mongodb.net/userDB",{useNewUrlParser:true});

const userSchema = {
  fname:String,
  lname:String,
  email:String,
  password:String,
  rpassword:String
};

const User = new mongoose.model("User", userSchema);

app.get("/", function(req,res){
    const name = "here";
    res.render("list", {webname:name})
 });
 app.get("/login",function(req,res){
  res.render("login");
 });
 
 app.get("/signup",function(req,res){
  res.render("register");
 });
 app.get("/review",function(req,res){
  res.render("card");
 });

 app.post("/signup",function(req,res){
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

app.post("/login", function(req,res){
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

// -----------Card  Data------------

// --------------------------------------------------
app.listen(3000, function() {
  console.log("Server started on port 3000.");
});


 