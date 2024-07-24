const { sendFeedbackEmail } = require('../helpers/mailSender');

let handleZohoEvents = (req, res) => {
    console.log('Zoho Ticket Updated (Field: Send CSAT Survey)')
    try {
        let data = req.body;
        if(!data[0]?.payload?.accountId || data[0]?.payload?.accountId !== '565242000000211477'){
            console.log(`⚠️  Skipping survey form for ${ticketNumber} as AccountName is not an Uptycs Inc`)
            return res.status(200).send("success");
        }
        let ticketId = data[0]?.payload?.id;
        let isEnabled = data[0]?.payload?.cf?.cf_send_csat_survey
        let customerEmail = data[0]?.payload?.email
        let ticketSubject = data[0]?.payload?.subject
        let ticketNumber = data[0]?.payload?.ticketNumber
        let ticketOwnerFullName = (data[0]?.payload?.assignee?.firstName + ' ' + data[0]?.payload?.assignee?.lastName) || 'Support Agent'
        let customerName = (data[0]?.payload?.contact?.firstName + ' ' + data[0]?.payload?.contact?.lastName) || 'Customer'
        let server_base_url = process.env.APP_BASE_URL;
        if(isEnabled === 'true'){
            console.log("⌛  Sending Feedform to the customer");
            sendFeedbackEmail(ticketId, customerName, ticketNumber, customerEmail, server_base_url, ticketSubject, ticketOwnerFullName);
            console.log("✅  Feedform has been sent to the customer");
        } else {
            console.log(`⚠️  Skipping survey form for ${ticketNumber} as cf_send_csat_survey is ${isEnabled}`)
        }
    } catch (err) {
        console.log("⛔ error while handling zoho events", err);
    }
    return res.status(200).send("success");
}

module.exports = handleZohoEvents;