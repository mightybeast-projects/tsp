import '../../google/load-client.js'
import * as templateController from '../template-controller.js';

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

var playlistTitle;

function getAllSongsOf(playlists) {
    playlists.forEach((playlist, index) =>
        setTimeout(() => getSongsOfPlaylist(playlist), 300 * index)
    );
}

function getSongsOfPlaylist(playlist) {
    playlistTitle = playlist.title;
    gapi.client.youtube.playlistItems.list({
        "part": ["snippet,contentDetails"],
        "maxResults": 200,
        "playlistId": playlist.id
    })
        .then(
            response => handleSongsReponse(response),
            err => console.error("Execute error", err)
        );
}

function handleSongsReponse(response) {
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

function trimTitle(songTitle) {
    songTitle = songTitle.trim();
    titleJunk.forEach(element => songTitle = songTitle.replace(element, ""));
    songTitle = songTitle.replace(" - ", "\n");
    return songTitle;
}

window.getAllSongsOf = function (playlists) { getAllSongsOf(playlists) }