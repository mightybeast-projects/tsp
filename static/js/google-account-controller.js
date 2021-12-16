gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: "450155192444-hhr9aen7g99eahrvm4fnn4jrmgc6mob2.apps.googleusercontent.com" });
});

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
        .then(function () { console.log("Sign-in successful"); },
        function (err) { console.error("Error signing in", err); });
}
  
function loadClient() {
    gapi.client.setApiKey("AIzaSyADyXkYDPEhxIVZpdRgkh71N12qZPsyvjM");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () {
            console.log("GAPI client loaded for API");
            $("#get-playlists-button").removeAttr("disabled");
            $("#get-songs-button").removeAttr("disabled");
        },
        function (err) { console.error("Error loading GAPI client for API", err); });
}
  
function execute() {
    return gapi.client.youtube.playlists.list({
        "part": [
        "snippet,contentDetails"
        ],
        "maxResults": 25,
        "mine": true
    })
        .then(function (response) {
            console.log("Response", response);
        },
        function (err) { console.error("Execute error", err); });
}