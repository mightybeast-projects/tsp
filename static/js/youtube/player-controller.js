import * as songsController from './songs-controller.js';

var player;
var currentSongIndex = 0;
var savedSongIndex = 0;

function onYouTubePlayerAPIReady() {
    setTimeout(() => {
        player = new YT.Player('ytplayer', {
            height: '200',
            width: '320',
            videoId: songsController.songs[currentSongIndex].id,
            playerVars: { autoplay: 1, rel: 0 },
            events: { onStateChange: onPlayerStateChange }
        });
    }, 1000);
}

function onPlayerStateChange(event) {
    var state = event.data;
    if (videoEnded(state) && songPoolHasMoreSongs()) {
        player.loadVideoById({ videoId: songsController.songs[++currentSongIndex].id });
        savedSongIndex = currentSongIndex;
    }
}

function switchSong(songElement) {
    var songId = $(songElement).attr("id");
    player.loadVideoById({ videoId: songId });
    currentSongIndex = --savedSongIndex;
}

function videoEnded(playerState) {
    return playerState == 0;
}

function songPoolHasMoreSongs() {
    return currentSongIndex < songsController.songs.length - 1;
}

window.onYouTubePlayerAPIReady = onYouTubePlayerAPIReady;
window.switchSong = function (songElement) { switchSong(songElement) }