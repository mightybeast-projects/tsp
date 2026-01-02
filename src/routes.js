var express = require('express');
var router = express.Router();
var playlists;

router.get('/', function (req, res) {
    res.render("index");
});

router.get('/main', function (req, res) {
    playlists = undefined;
    res.render("main");
});

router.get('/playlists', function (req, res) {
    res.render("playlists");
});

router.get('/songs', function (req, res) {
    res.render("songs", { playlists: playlists });
});

router.post('/songs', function (req, res) {
    playlists = req.body.playlists;
    res.json({ success: "Updated Successfully", status: 200 });
});

module.exports = router;