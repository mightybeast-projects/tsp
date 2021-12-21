import * as templateController from '../template-controller.js';
import * as utils from '../utils.js';

const titleJunk = [
    "[NCS Release]",
    "[Monstercat]",
    "[Monstercat Release]",
    "[Monstercat EP Release]",
    "Official Music Video",
    "【Dubstep】",
    "[Dubstep]",
    "【Drumstep】"
]

var playlistId;
var playlistTitle;

export function getAllSongs() {
    var checkboxes = $('.playlist-checkbox:checkbox:checked');

    checkboxes.each((index, element) =>
        setTimeout(() => getSongsOfCheckedPlaylist(element), index * 200));
}

function getSongsOfCheckedPlaylist(playlistElement) {
    playlistId = $(playlistElement).attr('id');
    playlistTitle = $(playlistElement).parent().parent().children(".playlist-name-cell").text();

    gapi.client.youtube.playlistItems.list({
        "part": ["snippet,contentDetails"],
        "maxResults": 200,
        "playlistId": playlistId
    })
        .then(
            response => handleSongsReponse(response),
            err => console.error("Execute error", err)
        );
}

function handleSongsReponse(response) {
    changeLayout();
    response.result.items.forEach(element => showSong(element));
    console.log(`Added ${response.result.items.length} songs from ${playlistTitle}`);
}

function showSong(arraySong) {
    var song = new Object();
    song.id = arraySong.snippet.resourceId.videoId;
    song.title = trimTitle(arraySong.snippet.title);
    song.thumbnail = arraySong.snippet.thumbnails.high.url;
    song.fromPlaylist = playlistTitle;

    templateController.appendSongTemplateToSongPool(song);
}

function changeLayout() {
    utils.changeDisplay($(".playlist-table"), "none");
    utils.changeDisplay($(".songs-div"), "flex");
    $("#create-playlist-button").removeAttr("disabled");
}

function trimTitle(songTitle) {
    songTitle = songTitle.trim();
    titleJunk.forEach(element => songTitle = songTitle.replace(element, ""));
    songTitle = songTitle.replace(" - ", "\n");
    return songTitle;
}