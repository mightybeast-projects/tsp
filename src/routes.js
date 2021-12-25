var express = require('express');
var dbController = require("./dbController");
var router = express.Router();

router.get('/', function(req, res) {
    res.render("index");
});

router.get('/main', function(req, res) {
    res.render("main");
});

router.get('/playlists', function(req, res) {
    res.render("playlists");
});

router.get('/lindex', function(req, res) {
    res.render("lindex");
});

router.get('/load', async function(req, res) {
    var loadedState = await dbController.findSavedState(req.query.userEmail);
    res.send(loadedState);
});

router.post('/save', function(req, res) {
    var newState = req.body;
    dbController.insertOrUpdate(newState, newState.userEmail);
});

module.exports = router;