var express = require('express');
var dbController = require("./dbController");
var router = express.Router();
var playlists;

router.get('/', function(req, res) {
    res.render("index");
});

router.get('/main', function(req, res) {
    playlists = undefined;
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

router.get('/loadState', async function(req, res) {
    var loadedState = await dbController.findSavedState(req.query.userEmail);
    res.send(loadedState);
});

router.get('/songs', function(req, res) {
    res.render("songs", { playlists: playlists });
});

router.post('/songs', function(req, res) {
    playlists = req.body.playlists;
    //req.app.set('playlists', req.body.playlists);
    res.json({success : "Updated Successfully", status : 200});
});

router.post('/save', function(req, res) {
    var newState = req.body;
    dbController.insertOrUpdate(newState, newState.userEmail);
});

module.exports = router;