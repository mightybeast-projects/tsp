import '../../google/load-client.js'
jQuery.fn.reverse = [].reverse;

var newPlaylistName;
var newPlaylistId;
var songIdToInsert;

function createNewPlaylist() {
    newPlaylistName = $("#new-playlist-name").val();
    console.log(newPlaylistName);

    insertNewPlaylist();
}

function insertNewPlaylist() {
    gapi.client.youtube.playlists.insert({
        "part": ["snippet,contentDetails"],
        "resource": {
            "snippet": {
                "title": newPlaylistName
            }
        }
    })
        .then(
            response => handlePlaylistInsertResponce(response),
            err => console.error("Execute error", err)
        );
}

function handlePlaylistInsertResponce(response) {
    console.log("Playlist created");
    newPlaylistId = response.result.id;

    setTimeout(() => insertAllSongsFromTop(), 10000);
}

function insertAllSongsFromTop() {
    var topSongs = $(".song-top-content-parent").children(".song-cell").reverse().toArray();
    topSongs.forEach((songElement, index) => 
        setTimeout(() => insertSongInPlaylist(songElement), index * 10000));
}

function insertSongInPlaylist(songElement) {
    songIdToInsert = $(songElement).attr('id');
    gapi.client.youtube.playlistItems.insert({
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
    })
        .then(
            response => console.log("Inserted " + response.result.snippet.title),
            err => console.error("Execute error", err)
        );
}

window.createNewPlaylist = createNewPlaylist;