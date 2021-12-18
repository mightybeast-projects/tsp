import * as templateController from "../template-controller.js";

jQuery.fn.reverse = [].reverse;

export var playlists = new Array();

export function getPlaylists() {
    gapi.client.youtube.playlists.list(
    {
        "part": [
            "snippet,contentDetails"
        ],
        "maxResults": 25,
        "mine": true
    })
    .then(
        function (response) {
            handlePlaylistsReponse(response);
        },
        function (err) {
            console.error("Execute error", err);
        }
    );
}

export function createNewPlaylist() {
    var newPlaylistName = $(".new-playlist-name").val();
    setTimeout(function () {
        insertNewPlaylist(newPlaylistName)
    }, 5000);
}

function handlePlaylistsReponse(response) {
    var result = response.result;
    console.log(result.items);

    changeDisplay($(".playlist-table"), "revert");

    var playlist;

    result.items.forEach(element => {
        playlist = new Object();

        playlist.publishDate = element.snippet.publishedAt;
        playlist.id = element.id;
        playlist.title = element.snippet.title;
        playlist.thumbnail = element.snippet.thumbnails.medium.url;

        playlists.push(playlist);

        templateController.appendPlaylistTemplate(playlist);
    });
}

function insertNewPlaylist(playlistName) {
    gapi.client.youtube.playlists.insert({
        "part": [
            "snippet,contentDetails"
        ],
        "resource": {
            "snippet": {
                "title": playlistName
            }
        }
    })
    .then(
        function (response) {
            handlePlaylistInsertResponce(response);
        },
        function (err) {
            console.error("Execute error", err);
        });
}

function handlePlaylistInsertResponce(response) {
    console.log("Playlist created");
    var newPlaylistID = response.result.id;

    setTimeout(function () {
        insertAllSongsFromTop(newPlaylistID);
    }, 7000);
}

function insertAllSongsFromTop(newPlaylistID) {
    var topSongs = $(".song-top-content-parent").children(".song-cell");
    topSongs = topSongs.reverse();
    for (let i = 0; i < topSongs.length; i++) {
        setTimeout(function () {
            var songID = $(topSongs[i]).attr('id');
            console.log(songID);
            insertSongInPlaylist(songID, newPlaylistID);
        }, i * 5000);
    }
}

function insertSongInPlaylist(songID, playlistID) {
    return gapi.client.youtube.playlistItems.insert({
        "part": [
            "snippet"
        ],
        "resource": {
            "snippet": {
                "playlistId": playlistID,
                "resourceId": {
                    "kind": "youtube#video",
                    "videoId": songID
                }
            }
        }
    })
        .then(
            function (response) {
                console.log(response.result);
            },
            function (err) {
                console.error("Execute error", err);
            });
}

function changeDisplay(element, displayValue) {
    $(element).css("display", displayValue);
}