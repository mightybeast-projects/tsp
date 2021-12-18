import * as templateController from "../template-controller.js";

var receivedPlaylists;

export function getAllSongsFrom(playlists) {
    receivedPlaylists = playlists;
    var checkboxes = $('.playlist-checkbox:checkbox:checked');

    checkboxes.each(function () {
        var checkedCheckbox = this;
        var playlistID = $(checkedCheckbox).attr('id');
        getSongsOfPlaylist(playlistID);
    });
}

function getSongsOfPlaylist(playlistID) {
    gapi.client.youtube.playlistItems.list({
        "part": [
            "snippet,contentDetails"
        ],
        "maxResults": 200,
        "playlistId": playlistID
    })
    .then(
        function (response) {
            handleSongsReponse(response, playlistID);
        },
        function (err) {
            console.error("Execute error", err);
        });
}

function handleSongsReponse(response, playlistID) {
    var result = response.result;
    console.log(result.items);

    changeDisplay($(".playlist-table"), "none");
    changeDisplay($(".songs-div"), "flex");
    $("#create-playlist-button").removeAttr("disabled");

    var song;
    var playlistTitle;

    result.items.forEach(element => {
        song = new Object();

        song.id = element.snippet.resourceId.videoId;
        song.title = trimTitle(element.snippet.title);
        song.thumbnail = element.snippet.thumbnails.high.url;
        if (playlistTitle == undefined) {
            receivedPlaylists.forEach(element => {
                if (element.id == playlistID)
                    playlistTitle = element.title;
            });
        }
        song.fromPlaylist = playlistTitle;

        templateController.appendSongTemplate(song, ".song-pool-content-parent");
    });
}

function trimTitle(songTitle) {
    songTitle = songTitle.trim();
    songTitle = songTitle.replace("[Monstercat Release]", "");
    songTitle = songTitle.replace("Official Music Video", "");
    songTitle = songTitle.replace("【Dubstep】", "");
    songTitle = songTitle.replace(" - ", "\n");
    return songTitle;
}

function changeDisplay(element, displayValue) {
    $(element).css("display", displayValue);
}