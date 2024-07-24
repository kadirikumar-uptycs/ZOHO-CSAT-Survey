let { App } = require('@slack/bolt');


let sendMessage = async (channel, blocks) => {
    let signingSecret = process.env.SLACK_SIGNING_SECRET;
    let token = process.env.SLACK_BOT_TOKEN;
    try {
        let app = new App({
            signingSecret,
            token,
        });
        await app.client.chat.postMessage({
            token,
            channel,
            blocks,
        })
    }catch(err){
        console.log("Error While Posting Message to the Slack Channel", err);
    }
}

module.exports = sendMessage