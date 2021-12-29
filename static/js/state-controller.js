import * as templateController from './template-controller.js';
import * as utils from './utils.js';

var songsPool = new Array();
var topSongs = new Array();

var elements;

export function saveState() {
    songsPool = getSongsState(".song-pool-content-parent");
    topSongs = getSongsState(".song-top-content-parent");

    console.log("Pool : " + JSON.stringify(songsPool, null, 2));
    console.log("Top : " + JSON.stringify(topSongs, null, 2));

    var state = new Object();
    state.userEmail = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
    state.songsPoolState = songsPool;
    state.topSongsState = topSongs;

    $.ajax({
        type: "POST",
        url:"/save",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(state)
    });
}

export function loadState() {
    var userEmail = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();

    $.ajax({
        type: "GET",
        url:"/load?userEmail=" + userEmail,
        success : states => initializeState(states[0])
    });
}

export function newLoadState() {
    var userEmail = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();

    $.ajax({
        type: "GET",
        url:"/loadState?userEmail=" + userEmail,
        success : states => initializeState(states[0])
    });
}

function getSongsState(parentClass) {
    var tmpArray = new Array();

    elements = $(parentClass).children(".song-cell");

    for (let i = 0; i < elements.length; i++) {
        var song = new Object();
        song.id = $(elements[i]).attr('id');
        song.title = $(elements[i]).children('.song-title').text();
        song.thumbnail = $(elements[i]).css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        song.fromPlaylist = $(elements[i]).children('.song-source').text();
        tmpArray.push(song);
    }

    return tmpArray;
}

function initializeState(state) {
    songsPool = state.songsPoolState;
    topSongs = state.topSongsState;

    utils.changeDisplay($(".playlist-table"), "none");
    utils.changeDisplay($(".songs-div"), "flex");

    songsPool.forEach(element => {
        templateController.appendSongTemplateToSongPool(element);
    });

    topSongs.forEach(element => {
        templateController.appendSongTemplateToSongTop(element);
    });
}