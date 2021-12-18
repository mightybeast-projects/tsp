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

        appendSongTemplate(song.id, song.title, song.thumbnail, song.fromPlaylist);
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

function changeDisplay(element, displayValue) {
    $(element).css("display", displayValue);
}