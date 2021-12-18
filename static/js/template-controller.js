export function appendPlaylistTemplate(playlist) {
    $(".playlist-table-body")
        .append(
            `
        <tr class="table-row">
            <td class="playlist-checkbox-cell">
                <input class="playlist-checkbox" type="checkbox" id="` + playlist.id + `">
            </td>
            <td class="playlist-thumbnail-cell">
                <img src="` + playlist.thumbnail + `" width="320" height="180">
            </td>
            <td class="playlist-name-cell">` + playlist.title + `</td>
            <td class="playlist-date-cell">` + playlist.publishDate + `</td>
        </tr>
        `
        );
}

export function appendSongTemplate(song, parentClass) {
    $(parentClass)
        .append(
            `
        <div id="` + song.id + `" class="song-cell ui-state-default" style="
            background-image: url(` + song.thumbnail + `);
        ">
            <button type="button" class="btn-close btn-close-white" aria-label="Close" onClick="removeSongDiv(this)"></button>
            <label class="song-title">` + song.title + `</label>
            <label class="song-source">` + song.fromPlaylist + `</label>
        </div>
        `
        );
}