var songsPool = new Array();
var topSongs = new Array();

var elements;

export function saveState()
{
    elements = $(".song-pool-content-parent").children(".song-cell");

    for (let i = 0; i < elements.length; i++) {
        var song = new Object();
        song.id = $(elements[i]).attr('id');
        song.title = $(elements[i]).children('.song-title').text();
        song.thumbnail = $(elements[i]).css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        song.fromPlaylist = $(elements[i]).children('.song-source').text();
        songsPool.push(song);
    }

    elements = $(".song-top-content-parent").children(".song-cell");

    for (let i = 0; i < elements.length; i++) {
        var song = new Object();
        song.id = $(elements[i]).attr('id');
        song.title = $(elements[i]).children('.song-title').text();
        song.thumbnail = $(elements[i]).css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        song.fromPlaylist = $(elements[i]).children('.song-source').text();
        topSongs.push(song);
    }

    console.log("Pool : " + JSON.stringify(songsPool, null, 2));
    console.log("Top : " + JSON.stringify(topSongs, null, 2));
}