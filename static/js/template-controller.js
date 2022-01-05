export function appendPlaylistTemplate(playlist) {
    $(".playlists-grid").append(getPlaylistString(playlist));
}

export function appendSongTemplateToSongPool(song) {
    $(".song-pool-content-parent").append(getSongString(song));
}

export function appendSongTemplateToSongTop(song) {
    $(".song-top-content-parent").append(getSongString(song));
}

function getPlaylistString(playlist) {
    return `
    <div class="playlist-element" onclick="togglePlaylist(this)">
        <input class="playlist-checkbox" type="checkbox" hidden id="${playlist.id}">
        <img class="playlist-thumbnail" src="${playlist.thumbnail}" width="320" height="180">
        <div class="playlist-info">
            <h5 class="playlist-title">${playlist.title}</h5>
            <h7>${playlist.itemCount} songs</h7>
        </div>
    </div>`
}

function getSongString(song) {
    return `
        <div id="${song.id}" class="song-cell ui-state-default" style="background-image: url(${song.thumbnail});" 
            onClick="switchSong(this)">
            <button type="button" class="btn-close btn-close-white" aria-label="Close" 
                onClick="event.stopPropagation(); removeSongDiv(this)"></button>
            <label class="song-title">${song.title}</label>
            <label class="song-source">${song.fromPlaylist}</label>
        </div>
        `;
}