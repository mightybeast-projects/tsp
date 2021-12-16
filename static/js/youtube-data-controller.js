jQuery.fn.reverse = [].reverse;

var playlists = new Array();
var songs = new Array();

function getPlaylists() {
    return gapi.client.youtube.playlists.list(
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

function getAllSongs() {
    var checkboxes = $('.playlist-checkbox:checkbox:checked');

    checkboxes.each(function () {
        var checkedCheckbox = this;
        var playlistID = $(checkedCheckbox).attr('id');
        getSongsOfPlaylist(playlistID);
    });
}

function createNewPlaylist() {
    var newPlaylistName = $(".new-playlist-name").val();
    setTimeout(function () {
        insertNewPlaylist(newPlaylistName)
    }, 5000);
}

function insertNewPlaylist(playlistName) {
    return gapi.client.youtube.playlists.insert({
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

function getSongsOfPlaylist(playlistID) {
    return gapi.client.youtube.playlistItems.list({
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

        appendPlaylistTemplate(playlist.id, playlist.thumbnail, playlist.title, playlist.publishDate);
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
            playlists.forEach(element => {
                if (element.id == playlistID)
                    playlistTitle = element.title;
            });
        }
        song.fromPlaylist = playlistTitle;

        songs.push(song);

        appendSongTemplate(song.id, song.title, song.thumbnail, song.fromPlaylist);
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

function appendPlaylistTemplate(playlistID, playlistThumbnail, playlistTitle, playlistPublishDate) {
    $(".playlist-table-body")
        .append(
            `
        <tr class="table-row">
            <td class="playlist-checkbox-cell">
                <input class="playlist-checkbox" type="checkbox" id="` + playlistID + `">
            </td>
            <td class="playlist-thumbnail-cell">
                <img src="` + playlistThumbnail + `" width="320" height="180">
            </td>
            <td class="playlist-name-cell">` + playlistTitle + `</td>
            <td class="playlist-date-cell">` + playlistPublishDate + `</td>
        </tr>
        `
        );
}

function appendSongTemplate(songID, songTitle, songThumbnail, songPlaylist) {
    $(".song-pool-content-parent")
        .append(
            `
        <div id="` + songID + `" class="song-cell ui-state-default" style="
            background-image: url(` + songThumbnail + `);
        ">
            <button type="button" class="btn-close btn-close-white" aria-label="Close" onClick="removeSongDiv(this)"></button>
            <label class="song-title">` + songTitle + `</label>
            <label class="song-source">` + songPlaylist + `</label>
        </div>
        `
        );
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

function removeSongDiv(songDiv) {
    $(songDiv).parent().remove();
}

function checkSongsCap(songsParent) {
    var topSongs = $(songsParent).children();
    var songsCap = 50;
    if (topSongs.length > songsCap)
        $(topSongs[songsCap]).remove();
}