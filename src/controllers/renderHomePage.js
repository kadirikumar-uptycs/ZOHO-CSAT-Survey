const renderHomePage = (req, res) => {
    let ticketId = req?.query?.id || 'ticketId';
    let ticketSubject = req?.query?.subject || 'Subject';
    let ticketNumber = req?.params?.ticketNumber || 'ticketNumber';
    let ticketOwnerFullName = req?.query?.agent || 'Support Agent';
    console.log(`📉 Feedback form opened by the customer for the ticket ${ticketNumber}`);
    res.render('../views/home', {
        ticketId,
        ticketSubject,
        ticketNumber,
        ticketOwnerFullName,
    });
}

module.exports = renderHomePage;