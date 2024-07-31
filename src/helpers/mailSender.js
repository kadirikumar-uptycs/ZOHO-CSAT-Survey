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
            console.log("⛔ Error while sending Email to the customer\n", error);
        }else{
            console.log("✅  Feedform has been sent to the customer");
        }
    });
}

const sendFeedbackEmail = async (hashedTicketId, customerName, ticketNumber, customerEmail, server_base_url) => {
    try {
        let gmailOptions = {
            from: 'Uptycs Customer Success customersuccess@uptycs.com',
            to: customerEmail,
            subject: 'How would you rate the support you received from Uptycs?',
            html: emailTemplate(hashedTicketId, ticketNumber, customerName, server_base_url),
        }
        sendMail(gmailOptions);
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    sendFeedbackEmail,
}