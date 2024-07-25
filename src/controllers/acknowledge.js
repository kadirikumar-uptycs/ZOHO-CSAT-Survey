let updateZohoTicketField = require('../helpers/updateZohoTicketFields');
let { getTicketDetailsByHashId, markResponded } = require('../models/updateDB');

let customerFeedback = (req, res) => {
    try {
        let data = req.body;
        console.log("Customer Submitted Feedback: \n", data);
        let ticketInfo = getTicketDetailsByHashId(data.hashedTicketId);
        let ticketId = ticketInfo.ticketId;
        updateZohoTicketField(ticketId, parseInt(data.question0));
        markResponded(data, data.hashedTicketId);
        delete data.hashedTicketId;
        res.render('../views/acknowledge');
    } catch (err) {
        console.log("⛔ Erroring while calling Update Function");
        res.render('../views/acknowledge');
    }
}

module.exports = customerFeedback;