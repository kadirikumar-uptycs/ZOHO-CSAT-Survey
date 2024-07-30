let { App } = require('@slack/bolt');
let slackFeedbackMessageBlocks = require('./slackTemplate');


let sendSlackMessage = async (blocks, text) => {
    let signingSecret = process.env.SLACK_SIGNING_SECRET;
    let token = process.env.SLACK_BOT_TOKEN;
    let channel = process.env.SLACK_CHANNEL_ID;
    try {
        let app = new App({
            signingSecret,
            token,
        });
        await app.client.chat.postMessage({
            token,
            channel,
            text,
            blocks,
        })
    }catch(err){
        console.log("Error While Posting Message to the Slack Channel", err);
    }
}

let forwardFeedbackToSlack = async (ticketInfo) => {
    try {
        let formattedMessageBlocks = slackFeedbackMessageBlocks(ticketInfo);
        await sendSlackMessage(formattedMessageBlocks, "Customer has responded to the survey");
    } catch (err) {
        console.log("Error while fowarding message to Slack Channel")
    }
    
}

module.exports = forwardFeedbackToSlack