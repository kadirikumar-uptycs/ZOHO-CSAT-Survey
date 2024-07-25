let { getTicketDetailsByHashId } = require('../models/updateDB');

const renderHomePage = (req, res) => {
    try {
        let hashedTicketId = req?.params?.hashedTicketId;
        let ticketInfo = getTicketDetailsByHashId(hashedTicketId);
        console.log(`📉 Feedback form opened by the customer for the ticket ${ticketInfo.ticketNumber}`);
        res.render('../views/home', {
            ...ticketInfo,
            hashedTicketId
        });
    } catch (err) {
        console.log('Error while Rendering Feedback form\n', err)
        return res.status(500).send("INTERNAL SERVER ERROR");
    }
}

module.exports = renderHomePage;