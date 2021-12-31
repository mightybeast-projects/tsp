import '../../google/load-client.js'
import * as templateController from '../../template-controller.js';
jQuery.fn.reverse = [].reverse;

export var playlists = new Array();

const getPlaylistsRequestSettings = {
    "part": ["snippet,contentDetails"],
    "maxResults": 25,
    "mine": true
}

setTimeout(() => getPlaylists(), 550);

function getPlaylists() {
    gapi.client.youtube.playlists.list(getPlaylistsRequestSettings)
        .then(
            response => showPlaylists(response),
            err => console.error("Execute error", err)
        );
}

function sendChosenPlaylists() {
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

function showPlaylists(response) {
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

window.getPlaylists = getPlaylists;
window.sendChosenPlaylists = sendChosenPlaylists;