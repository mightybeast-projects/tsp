import * as gac from '../google/account-controller.js';
import * as playlistController from './playlists-controller.js';
import * as songsController from './songs-controller.js';
import * as stateController from "../state-controller.js";

loadGAPIClient();

export function removeSongDiv(songDiv) {
    $(songDiv).parent().remove();
}

export function checkSongsCap(songsParent) {
    var topSongs = $(songsParent).children();
    var songsCap = 50;
    if (topSongs.length > songsCap)
        $(topSongs[songsCap]).remove();
}

function loadGAPIClient()
{
    setTimeout(async function () {
        await gac.loadClient();
    }, 60);
}

window.getPlaylists = playlistController.getPlaylists;
window.getAllSongs = function() { songsController.getAllSongsFrom(playlistController.playlists); };
window.createNewPlaylist = playlistController.createNewPlaylist;
window.saveState = stateController.saveState;
window.loadState = stateController.loadState;
window.removeSongDiv = removeSongDiv;
window.checkSongsCap = checkSongsCap;