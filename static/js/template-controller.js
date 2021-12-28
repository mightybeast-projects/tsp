export function appendPlaylistTemplate(playlist) {
    $(".playlist-table-body").append(getOldPlaylistString(playlist));
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

function getOldPlaylistString(playlist) {
    return `
    <tr class="table-row">
        <td class="playlist-checkbox-cell">
            <input class="playlist-checkbox" type="checkbox" id="${playlist.id}">
        </td>
        <td class="playlist-thumbnail-cell">
            <img src="${playlist.thumbnail}" width="320" height="180">
        </td>
        <td class="playlist-name-cell">${playlist.title}</td>
        <td class="playlist-date-cell">${playlist.publishDate}</td>
    </tr>
    `
}

function getSongString(song) {
    return `
        <div id="${song.id}" class="song-cell ui-state-default" style="
            background-image: url(${song.thumbnail});
        ">
            <button type="button" class="btn-close btn-close-white" aria-label="Close" onClick="removeSongDiv(this)"></button>
            <label class="song-title">${song.title}</label>
            <label class="song-source">${song.fromPlaylist}</label>
        </div>
        `;
}