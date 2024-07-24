const nodemailer = require('nodemailer');
const emailTemplate = require('./emailTemplate');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});


const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

const sendFeedbackEmail = async (ticketId, customerName, ticketNumber, customerEmail, server_base_url, ticketSubject, ticketOwnerFullName) => {
    try {
        let gmailOptions = {
            to: customerEmail,
            subject: 'How would you rate the support you received from Uptycs?',
            html: emailTemplate(ticketId, ticketNumber, customerName, server_base_url, ticketSubject, ticketOwnerFullName),
        }
        sendMail(gmailOptions);
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    sendFeedbackEmail,
}