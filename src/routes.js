var express = require('express');
var dbController = require("./dbController");
var router = express.Router();

router.get('/', function(req, res) {
    res.render("index");
});

router.get('/lindex', function(req, res) {
    res.render("lindex");
});

router.post('/save', function(req, res) {
    var newSaveState = {
        userEmail: req.body.userEmail,
        songsPoolState: req.body.songsPoolState,
        topSongsState: req.body.topSongsState
    }
    dbController.insert(newSaveState);
    res.send(`${req.body.userEmail} ${req.body.songPoolState} ${req.body.topSongsState}`);
});

module.exports = router;