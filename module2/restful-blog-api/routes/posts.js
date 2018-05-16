let store = require("../store.js");

module.exports = {

    getPosts(req, res) {
        res.status(200).send(store.posts);
    },

    addPost(req, res) {
        let newPost = req.body;
        let id = store.posts.length;
        newPost.comments = [];
        store.posts.push(newPost);
        res.status(201).send({id: id});
    },

    updatePost(req, res) {
        const id = req.params.postId;
        let post = store.posts[id];
        const comments = post.comments;
        
        store.posts[id] = req.body;

        // Preserve comments if there are any
        if (comments.length >= 1) {
            store.posts[id].comments = comments;
        }

        res.status(200).send(store.posts[id]);
    },

    removePost(req, res) {
        const id = req.params.postId;
        let newPosts = store.posts.splice(store.posts.indexOf(id), store.posts.indexOf(id) + 1);
        store.posts = newPosts;
        res.status(204).send();
    }
}