const { sendFeedbackEmail } = require('../helpers/mailSender');
const { generateHash, addOrUpdateTicketDetails } = require('../models/updateDB');


let handleZohoEvents = (req, res) => {
    console.log('\nZoho Ticket has been updated (Field: Send CSAT Survey)')
    try {
        let data = req.body;
        let payload;
        if (Array.isArray(data)) {
            payload = data[0]?.payload;
            payload ??= {};
        }
        let accountId = data[0]?.payload?.accountId;
        if (!accountId || accountId !== '565242000000211477') {
            console.log(`⚠️  Skipping survey form for ${ticketNumber} because either AccountName is Empty or Uptycs Inc`)
            return res.status(200).send("success");
        }
        let isEnabled = payload?.cf?.cf_send_csat_survey;
        let ticketInfo = {
            ticketId: payload?.id,
            URL: payload.webUrl,
            customerEmail: payload?.email,
            ticketSubject: payload?.subject,
            ticketNumber: payload?.ticketNumber,
            ticketOwnerFirstName: payload?.assignee?.firstName,
            ticketOwnerLastName: payload?.assignee?.lastName,
            customerFirstName: payload?.contact?.firstName,
            customerLastName: payload?.contact?.lastName,
            accountName: payload?.contact?.account?.accountName,
            isResponded: false,
        };
        let server_base_url = process.env.APP_BASE_URL;
        if (isEnabled === 'true') {
            let hashedTicketId = generateHash(ticketInfo.ticketId)
            addOrUpdateTicketDetails(ticketInfo, ticketInfo.ticketId)
            console.log("⌛  Sending Feedform to the customer");
            sendFeedbackEmail(hashedTicketId, ticketInfo.customerFirstName, ticketInfo.ticketNumber, ticketInfo.customerEmail, server_base_url);
        } else {
            console.log(`⚠️  Skipping survey form for ${ticketInfo?.ticketNumber} as cf_send_csat_survey is ${isEnabled}\n\n`)
        }
    } catch (err) {
        console.log("⛔ error while handling zoho events", err);
    }
    return res.status(200).send("success");
}

module.exports = handleZohoEvents;