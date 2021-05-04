const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const port = 3000

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const day1 = {userInputTitle: "Day 1", userInputPost: "Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Eu volutpat odio facilisis mauris sit. Lectus magna fringilla urna porttitor rhoncus dolor purus. Facilisi etiam dignissim diam quis. Urna et pharetra pharetra massa massa ultricies. Vitae tempus quam pellentesque nec nam aliquam sem et. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Eget gravida cum sociis natoque penatibus. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Suspendisse sed nisi lacus sed viverra tellus in. Metus aliquam eleifend mi in nulla posuere. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Tristique sollicitudin nibh sit amet. Ac turpis egestas maecenas pharetra convallis. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Mi ipsum faucibus vitae aliquet nec ullamcorper sit."}
const day2 = {userInputTitle: "Day 2", userInputPost: "In egestas erat imperdiet sed euismod nisi porta. Ut tortor pretium viverra suspendisse potenti nullam ac. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Dolor magna eget est lorem. Malesuada fames ac turpis egestas sed tempus urna et. Curabitur vitae nunc sed velit dignissim sodales. Magna etiam tempor orci eu lobortis elementum nibh. Eleifend mi in nulla posuere sollicitudin aliquam. Aliquet enim tortor at auctor urna. Id semper risus in hendrerit gravida rutrum quisque non tellus. Quisque non tellus orci ac auctor augue mauris augue. Pellentesque sit amet porttitor eget dolor morbi non arcu. Tristique magna sit amet purus gravida. Tellus rutrum tellus pellentesque eu tincidunt tortor. Semper quis lectus nulla at volutpat diam ut venenatis. Massa massa ultricies mi quis hendrerit dolor magna eget est. Nisl nisi scelerisque eu ultrices vitae auctor. At auctor urna nunc id cursus metus aliquam eleifend mi. Mauris nunc congue nisi vitae suscipit tellus. Ac turpis egestas sed tempus urna et pharetra."}
const day3 = {userInputTitle: "Day 3", userInputPost: "Purus in massa tempor nec feugiat nisl pretium fusce. Magna fringilla urna porttitor rhoncus dolor purus non. Egestas quis ipsum suspendisse ultrices gravida dictum. Sed faucibus turpis in eu mi bibendum neque egestas. Duis tristique sollicitudin nibh sit amet commodo nulla. Nisl vel pretium lectus quam id leo in vitae. Nullam vehicula ipsum a arcu. Proin sagittis nisl rhoncus mattis. Fermentum leo vel orci porta non. Placerat vestibulum lectus mauris ultrices. Feugiat vivamus at augue eget arcu. Nisl suscipit adipiscing bibendum est ultricies integer quis. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Leo urna molestie at elementum. Dis parturient montes nascetur ridiculus. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Facilisi etiam dignissim diam quis. Mattis vulputate enim nulla aliquet porttitor. Velit scelerisque in dictum non consectetur a erat nam. Amet nisl purus in mollis."}

let posts = [day1, day2, day3];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {homeText: homeStartingContent, posts: posts});
});

app.get("/about", function(req, res){
  res.render("about", {aboutText: aboutContent});
})

app.get("/contact", function(req, res){
  res.render("contact", {contactText: contactContent});
})

app.get("/compose", function(req, res){
  res.render("compose");
})

app.post("/compose", function(req, res){
  const post = {
    userInputTitle: req.body.userTextTitle,
    userInputPost: req.body.userTextPost
  };

  posts.push(post);
  
  console.log(post);

  res.redirect("/");
})

app.get("/posts/:postName", function(req, res){
  const postTitle = _.lowerCase(req.params.postName)
  
  posts.forEach(function(post){
    if(_.lowerCase(post.userInputTitle) === postTitle){
      res.render("post", {
        postTitle: post.userInputTitle,
        postText: post.userInputPost
      });
    }
  })
})

app.listen(process.env.PORT || port, function(){
  console.log("Server started on port " + port);
});
