const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
let store = require("./store.js");

let app = express();

app.use(bodyParser.json());

// Retrieve and add new posts
app.get("/posts", routes.posts.getPosts);
app.post("/posts", routes.posts.addPost);

// Update and remove existing posts
app.put("/posts/:postId", routes.posts.updatePost);
app.delete("/posts/:postId", routes.posts.removePost)

// Retrieve and add comments
app.get("/posts/:postId/comments", routes.comments.getComments);
app.post("/posts/:postId/comments", routes.comments.addComment);

// Update and remove comments
app.put("/posts/:postId/comments/:commentId", routes.comments.updateComment);
app.delete("/posts/:postId/comments/:commentId", routes.comments.removeComment);

app.listen(3000);
