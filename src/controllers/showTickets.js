let ticketData = require('../models/ticketDB.json');

let showTickets = (_, res) => {
    try {
        return res.render('../views/tickets', {
            tickets: ticketData
        });
    } catch (err) {
        console.log('Error While rendering tickets page\n', err);
        return res.status(500).send('INTERNAL SERVER ERROR');
    }
}

module.exports = showTickets;