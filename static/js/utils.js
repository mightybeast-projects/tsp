const selectProperties = {
    border: "3px solid green",
    transform: 'scale(.95)'
}

const deselectProperties = {
    border: "3px solid transparent",
    transform: 'scale(1)'
}

function togglePlaylist(playlistElement)
{
    var checkbox = $(playlistElement).children(".playlist-checkbox");
    var selected = $(checkbox).prop("checked");
    if (!selected)
    $(playlistElement).css(selectProperties);
    else $(playlistElement).css(deselectProperties);

    $(checkbox).prop("checked", !selected)
}

function checkSongsCap(songsParent) {
    var topSongs = $(songsParent).children();
    var songsCap = 50;
    if (topSongs.length > songsCap)
        $(topSongs[songsCap]).remove();
}

function removeSongDiv(songDiv) {
    $(songDiv).parent().remove();
}

window.togglePlaylist = function (songsParent) { togglePlaylist(songsParent); };
window.removeSongDiv = function (songDiv) { removeSongDiv(songDiv); };
window.checkSongsCap = function (songsParent) { checkSongsCap(songsParent); };