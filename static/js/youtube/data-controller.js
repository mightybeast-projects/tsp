import * as gac from '../google/account-controller.js';
import * as playlistController from './playlists-controller.js';
import * as songsController from './songs-controller.js';
import * as stateController from '../state-controller.js';
import * as utils from '../utils.js';

setTimeout(async () => await gac.loadClient(), 60);

window.getPlaylists = playlistController.getPlaylists;
window.sendChosenPlaylists = playlistController.sendChosenPlaylists;
window.getAllSongs = songsController.getAllSongs;
window.createNewPlaylist = playlistController.createNewPlaylist;
window.saveState = stateController.saveState;
window.loadState = stateController.loadState;
window.newLoadState = stateController.newLoadState;
window.removeSongDiv = function (songDiv) { utils.removeSongDiv(songDiv); };
window.checkSongsCap = function (songsParent) { utils.checkSongsCap(songsParent); };
window.getAllSongsOf = function (playlists) { songsController.getAllSongsOf(playlists) }