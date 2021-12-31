import '../../google/load-client.js'

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

function createNewPlaylist() {
    newPlaylistName = $(".new-playlist-name").val();
    setTimeout(() => insertNewPlaylist(newPlaylistName), 5000);
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
    topSongs.items.forEach((element, index) => insertSongToPlaylistWithDelay(element, index));
}

function insertSongToPlaylistWithDelay(songElement, index) {
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

window.createNewPlaylist = createNewPlaylist;