let axios = require('axios');

let getAccessToken = async () => {
    let REFRESH_ACCESS_TOKEN_URL = 'https://accounts.zoho.com/oauth/v2/token?client_id=1000.ZW5DOR5559PRNZO9M7N1E9HEQ5FKTI&client_secret=b1e15d4c91358ab9029beefbfa4452fa50803b19c5&scope=Desk.tickets.ALL&redirect_uri=https://5fbf-223-185-116-128.ngrok-free.app/5521&grant_type=refresh_token&refresh_token=1000.1480733b330a18d0fd760b448901582a.a253867d3591173ddc7faa5c3c509b93';
    try {
        let response = await axios.post(REFRESH_ACCESS_TOKEN_URL, {});
        return response.data.access_token ? response.data.access_token : null;
    } catch (err) {
        console.log("⛔ error while generating Access Token out of Refresh Token", err);
        return null;
    }
}

let updateZohoTicketField = async (ticketId, q1_score) => {
    try {
        let url = `https://desk.zoho.com/api/v1/tickets/${ticketId}`
        let access_token = await getAccessToken();
        if(!access_token){
            console.log("Access Token is not Truthy", access_token);
            return
        }
        // Call PATCH method
        await axios.patch(url, {
            "cf": {
                "cf_question_1_score": q1_score
            }
        },
            {
                headers: {
                    'orgId': '734382979',
                    'Authorization': `Zoho-oauthtoken ${access_token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        console.log(`✅  Updated Zoho Ticket ${ticketId}`);
    } catch (err) {
        console.log("⛔ Error while updating Zoho Ticket Attribute", err);
    }
}

module.exports = updateZohoTicketField;