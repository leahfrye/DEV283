const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/edx-course-db");

const Post = mongoose.model("Post", {
    name: String,
    url: String,
    text: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const Comment = mongoose.model("Comment", {
    text: String
});

let newComments = [
    { text: "Test Comment #1" },
    { text: "Test Comment #1" },
    { text: "Test Comment #1" },
];

newComments = newComments.map((comment) => {
    const c = new Comment(comment)
    c.save()
    return c._id
})

console.log(newComments)

let post = new Post({
    name: "Title of post",
    url: "www.reddit.com",
    text: "This is my first post!",
    comments: newComments
});

post.save((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("The post is saved: ", post.toJSON());
    }
}, Post.findOne({name: /Title of post/i}).populate("comments").exec((err, post) => {
    if (err) return console.error(err);
    console.log(`The post is ${post}`);
    mongoose.disconnect();
}));