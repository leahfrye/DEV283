const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");

// The data
let store = {};
store.accounts = [];

// The app
let app = express();

// Middleware
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(errorhandler());

// Sends store.accounts when users access the "accounts" page
app.get("/accounts", (req, res) => {
    res.status(200).send(store.accounts);
});

// Adds a new account
app.post("/accounts", (req, res) => {
    let newAccount = req.body;
    let id = store.accounts.length;
    store.accounts.push(newAccount);
    res.status(201).send({id: id});
});

// Updates an account, using the id parameter
app.put("/accounts/:id", (req, res) => {
    store.accounts[req.params.id] = req.body;
    res.status(200).send(store.accounts[req.params.id]);
});

// Deletes an account using the id parameter
app.delete("/accounts/:id", (req, res) => {
    store.accounts.splice(req.params.id, 1);
    res.status(204).send();
});

// Run the app on localhost port 3000
app.listen(3000);