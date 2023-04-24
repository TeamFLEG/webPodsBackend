const google = require("googleapis").google;

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

async function getGoogleUser({ code }) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2',
    });
    const { data } = await oauth2.userinfo.get();
    return data;
}

module.exports = getGoogleUser;