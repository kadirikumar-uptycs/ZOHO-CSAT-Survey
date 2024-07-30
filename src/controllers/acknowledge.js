let updateZohoTicketField = require('../helpers/updateZohoTicketFields');
let { getTicketDetailsByHashId, markResponded } = require('../models/updateDB');

let customerFeedback = (req, res) => {
    try {
        let data = req.body;
        console.log("Customer Submitted Feedback: \n", data);
        let ticketInfo = getTicketDetailsByHashId(data.hashedTicketId);
        let ticketId = ticketInfo.ticketId;
        updateZohoTicketField(ticketId, parseInt(data.question0));
        let hashedTicketId = data.hashedTicketId;
        delete data.hashedTicketId;
        let formattedData = []
        for (let index = 0; index < 5; index++) {
            let obj = {
                questionNumber: index + 1,
                score: data['question' + index],
                feedback: data['feedback' + index]
            }
            formattedData.push(obj);
        }
        formattedData.push({ comments: data.comments })
        markResponded(formattedData, hashedTicketId);
        return res.render('../views/acknowledge');
    } catch (err) {
        console.log("⛔ Erroring while calling Update Function");
        return res.render('../views/acknowledge');
    }
}

module.exports = customerFeedback;