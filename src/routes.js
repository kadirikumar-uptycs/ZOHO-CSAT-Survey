const express = require('express');
const path = require('path');
const router = express.Router();

const controllers = require('./controllers');

router.get('/uptycs_logo', (_, res) => {
    res.sendFile(path.join(__dirname, '../public/images/uptycs_logo.png'));
})
router.post('/zohoEvents', controllers.handleZohoEvents);
router.get('/:ticketNumber', controllers.renderHomePage);
router.post('/acknowledge', controllers.acknowledge);


module.exports = router;