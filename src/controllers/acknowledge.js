let updateZohoTicketField = require('../helpers/updateZohoTicketFields');

let customerFeedback = (req, res) => {
    try {
        let data = req.body;
        console.log("Feedback data: \n", data);
        updateZohoTicketField(data.ticketId, parseInt(data.question0))
        res.render('../views/acknowledge');
    } catch (err) {
        console.log("⛔ Erroring while calling Update Function");
        res.render('../views/acknowledge');
    }
}

module.exports = customerFeedback;