const express = require('express');
const path = require('path');
const router = express.Router();

const controllers = require('./controllers');

router.get('/uptycs_logo', (_, res) => {
    res.sendFile(path.join(__dirname, '../public/images/uptycs_logo.png'));
})
router.post('/zohoEvents', controllers.handleZohoEvents);
router.post('/acknowledge', controllers.acknowledge);
router.get('/tickets', controllers.showTickets);
router.get('/:hashedTicketId', controllers.renderHomePage);


module.exports = router;