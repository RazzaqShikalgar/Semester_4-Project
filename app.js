
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const session = require('express-session');
// const models = require()
const routes = require('./routes/routes.js');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const a = require('./controllers/photocontroller.js');
const blogs = require('./controllers/blogcontroller.js');
const cards = require('./controllers/cardscontroller.js');
const Category = require('./models/category');
const Blogs = require('./models/blogs');
const Cards = require('./models/cards');

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb+srv://Razzaq:Razzaq%402003@cluster0.pysaqrm.mongodb.net/userDB",{useNewUrlParser:true});

app.use(routes);
// a();
// blogs();
// cards();
// app.use(models);
// -----------Card  Data------------

app.get('/',async(req, res) => {
  try {
  const limitNumber = 8;
  const blognumber = 3;
  const cardNumber = 4;
  const categories = await Category.find({}).limit(limitNumber);
  const blogs = await Blogs.find({}).limit(blognumber);
  const cards = await Cards.find({}).limit(cardNumber);
  const name="here";
  res.render("list", {webname:name , categories ,blogs ,cards});
  // console.log(categories);
} catch (error) {
  res.status(500).send({message: error.message || "Error Ocured"});
}
});
// --------------------------------------------------


app.listen(3000 , function() {
  console.log("Server started on port 3000.");
});


 