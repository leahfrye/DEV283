let store = require("../store.js");

module.exports = {

    getComments(req, res) {
        const comments = store.posts[req.params.postId].comments;
        res.status(200).send(comments);
    },

    addComment(req, res) {
        const newComment = req.body;
        const id = req.params.postId;
        store.posts[id].comments.push(newComment);
        res.status(201).send(store.posts[id].comments);
    },

    updateComment(req, res) {
        const newComment = req.body.text;
        const { postId, commentId } = req.params;
        store.posts[postId].comments[commentId].text = newComment;
        res.status(200).send(store.posts[postId].comments); 
    },

    removeComment(req, res) {
        const { postId, commentId } = req.params;
        let newComments = store.posts[postId].comments;
        newComments.splice(newComments.indexOf[commentId], 1);
        store.posts[postId].comments = newComments;
        res.status(204).send(newComments);
    }

}