const clientId = "450155192444-hhr9aen7g99eahrvm4fnn4jrmgc6mob2.apps.googleusercontent.com";
const APIKey = "AIzaSyADyXkYDPEhxIVZpdRgkh71N12qZPsyvjM";
const clientLoadUrl = "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest";
const signInScope = "https://www.googleapis.com/auth/youtube.force-ssl";

const authConfig = { 
    client_id: clientId,
    ux_mode: 'redirect',
    redirect_uri: 'http://localhost:3000/main'
}

export function loadClient() {
    gapi.client.setApiKey(APIKey);
    gapi.client.load(clientLoadUrl)
        .then(
            () => console.log("GAPI client loaded for API"),
            err => console.error("Error loading GAPI client for API", err));
}

function authenticate() {
    gapi.auth2.getAuthInstance()
        .signIn({ scope: signInScope })
        .then(
            () => console.log("Sign-in successful"),
            err => console.error("Error signing in", err));
}

gapi.load("client:auth2", () => gapi.auth2.init(authConfig));

window.authenticate = authenticate;