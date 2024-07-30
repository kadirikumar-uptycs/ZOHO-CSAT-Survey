let fs = require('fs');
let path = require('path');
const crypto = require('crypto');
const forwardFeedbackToSlack = require('../helpers/sendSlackMessage');


const dataFile = path.join(__dirname, 'ticketDB.json');

function readDataFile() {
    try {
        const data = fs.readFileSync(dataFile, 'utf8');
        if (!data) {
            return [];
        }
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data file', err);
        return [];
    }
}

function writeDataToFile(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(dataFile, jsonData, 'utf8');
    } catch (err) {
        console.error('Error writing data to file\n', err);
    }
}


function generateHash(ticketId) {
    return crypto.createHash('sha256').update(ticketId.toString()).digest('hex');
}

function addOrUpdateTicketDetails(newRecord, ticketId) {
    const data = readDataFile();
    const newId = generateHash(ticketId);
    const recordIndex = data.findIndex(record => record.id === newId);
    if (recordIndex !== -1) {
        data[recordIndex] = { ...newRecord, id: newId };
    } else {
        newRecord.id = newId;
        data.push(newRecord);
    }
    writeDataToFile(data);
}

async function markResponded(customerFeedback, hashedTicketId) {
    try {
        const data = readDataFile();
        const recordIndex = data.findIndex(record => record.id === hashedTicketId);
        if (recordIndex !== -1) {
            data[recordIndex] = {
                ...data[recordIndex],
                customerFeedback,
                isResponded: true,
            }
            forwardFeedbackToSlack(data[recordIndex]);
        } else {
            console.log('🛑 Record Not Found to concat feedback data')
        }
        writeDataToFile(data);
        console.log('✅ Updated DB File with Feedback')
    } catch (err) {
        console.log('⛔ Error While Updating DB file with Feedback\n', err);
    }
}

function getTicketDetailsByHashId(hashedTicketId) {
    const data = readDataFile();
    return data.find(record => record.id === hashedTicketId);
}

module.exports = {
    generateHash,
    getTicketDetailsByHashId,
    addOrUpdateTicketDetails,
    markResponded,
}