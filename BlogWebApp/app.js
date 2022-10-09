const express = require("express");
const ejs = require("ejs");
const _ = require('lodash');
const port = 3000;
const mongoose = require('mongoose');
const { Schema } = mongoose;

require('dotenv').config();

mongoose.connect('mongodb+srv://jorgeTrejo:090901.Jt.090901@resumeprojects.n5likbk.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const homeStartingContent = "This is a simple blog website where you can create blogs which are all saved locally. To add a new blog go to this URL: \"localhost:3000/compose\". To delete all blogs go to: \"localhost:3000/reset\".";
const aboutContent = "This is an example about page. Any information pertaining to the origin of this blog website would be put here.";
const contactContent = "This is an example contact page which would have information such as phone, email, etc.";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

// Schema

const postSchema = new Schema({
  title: String,
  content: String
});

// Model

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {

  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('home', {
        homeStartingContent: homeStartingContent,
        posts: posts,
        _: _
      });
    }
  });
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

// get route to get individual post when user wants to read more
app.get('/posts/:postID', (req, res) => {

  const postID = req.params.postID;

  Post.findById(postID, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      res.render('post', {post: post});
    }
  });
});

// reset the database and delete all blogs
app.get('/reset', (req, res) => {

  Post.deleteMany({}, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/')
    }
  })
})

app.post('/compose', async (req, res) => {
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  
  const post = new Post({
    title: postTitle,
    content: postBody
  });

  await post.save();

  res.redirect('/');
});

app.listen(port, () => {
  console.log("Server started on port 3000");
});
