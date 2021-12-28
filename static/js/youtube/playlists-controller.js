import * as templateController from '../template-controller.js';
import * as utils from '../utils.js';
jQuery.fn.reverse = [].reverse;

export var playlists = new Array();

const getPlaylistsRequestSettings = {
    "part": ["snippet,contentDetails"],
    "maxResults": 25,
    "mine": true
}
const insertNewPlaylistRequestSettings = {
    "part": ["snippet,contentDetails"],
    "resource": {
        "snippet": {
            "title": newPlaylistName
        }
    }
}
const insertSongInPlaylistRequestSettings = {
    "part": ["snippet"],
    "resource": {
        "snippet": {
            "playlistId": newPlaylistId,
            "resourceId": {
                "kind": "youtube#video",
                "videoId": songIdToInsert
            }
        }
    }
}

var newPlaylistName;
var newPlaylistId;
var songIdToInsert;

export function getPlaylists() {
    gapi.client.youtube.playlists.list(getPlaylistsRequestSettings)
        .then(
            response => showPlaylists(response),
            err => console.error("Execute error", err)
        );
}
export function sendChosenPlaylists() {
    var chosenPlaylistsId = $('.playlist-checkbox:checkbox:checked').get();
    var chosenPlaylists = new Array();

    chosenPlaylistsId.forEach(playlistCheckbox => {
        playlists.forEach(playlist => {
            if (playlist.id == playlistCheckbox.id)
                chosenPlaylists.push(playlist);
        })
    });

    var model = new Object();
    model.playlists = chosenPlaylists.reverse();
    $.ajax({
        type: "POST",
        url:"/songs",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(model),
        success: function () { window.location = "/songs" }
    });
}

export function createNewPlaylist() {
    newPlaylistName = $(".new-playlist-name").val();
    setTimeout(() => insertNewPlaylist(newPlaylistName), 5000);
}

function showPlaylists(response) {
    utils.changeDisplay($(".playlist-table"), "revert");

    response.result.items.forEach(element => showPlaylistElement(element));
}

function showPlaylistElement(playlistElement) {
    var playlist = new Object();
    playlist.itemCount = playlistElement.contentDetails.itemCount;
    playlist.id = playlistElement.id;
    playlist.title = playlistElement.snippet.title;
    playlist.thumbnail = playlistElement.snippet.thumbnails.medium.url;

    playlists.push(playlist);
    templateController.appendPlaylistTemplate(playlist);
}

function insertNewPlaylist() {
    gapi.client.youtube.playlists.insert(insertNewPlaylistRequestSettings)
        .then(
            response => handlePlaylistInsertResponce(response),
            err => console.error("Execute error", err)
        );
}

function handlePlaylistInsertResponce(response) {
    console.log("Playlist created");
    newPlaylistId = response.result.id;

    setTimeout(() => insertAllSongsFromTop(), 7000);
}

function insertAllSongsFromTop() {
    var topSongs = $(".song-top-content-parent").children(".song-cell").reverse();
    topSongs.items.forEach((element, index) => insertSongInPlaylistWithDelay(element, index));
}

function insertSongInPlaylistWithDelay(songElement, index) {
    setTimeout(() => insertSongInPlaylist(songElement), index * 5000);
}

function insertSongInPlaylist(songElement) {
    songIdToInsert = $(songElement).attr('id');
    gapi.client.youtube.playlistItems.insert(insertSongInPlaylistRequestSettings)
        .then(
            response => console.log(response.result),
            err => console.error("Execute error", err)
        );
}