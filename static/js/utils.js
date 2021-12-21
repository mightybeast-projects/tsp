export function checkSongsCap(songsParent) {
    var topSongs = $(songsParent).children();
    var songsCap = 50;
    if (topSongs.length > songsCap)
        $(topSongs[songsCap]).remove();
}

export function removeSongDiv(songDiv) {
    $(songDiv).parent().remove();
}

export function changeDisplay(element, displayValue) {
    $(element).css("display", displayValue);
}