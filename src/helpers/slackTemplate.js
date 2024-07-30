let questions = [
    "How would you rate the responsiveness of our support team?",
    "How well did Agent understand your needs?",
    "How satisfied are you with the resolution of your case?",
    "How likely are you to recommend Uptycs to others?",
    "How would you rate the overall quality of service?",
]

function messageDivider() {
    return {
        "type": "divider"
    }
}

let slackMessageHeader = ({ ticketNumber, ticketSubject, URL, accountName, customerFirstName, customerLastName, ticketOwnerFirstName, ticketOwnerLastName }) => {
    return [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": `Customer has given following feedback for the ticket ${ticketNumber}:`
            }
        },
        {
            "type": "section",
            "block_id": `header-${ticketNumber}`,
            "text": {
                "type": "mrkdwn",
                "text": `<${URL}| ${ticketSubject}> \n\n *Account Name*: _${accountName}_\n*Customer Name*: _${customerFirstName + ' ' + customerLastName}_\n*Ticket Owner*: _${ticketOwnerFirstName + ' ' + ticketOwnerLastName}_`
            },
            "accessory": {
                "type": "image",
                "image_url": "https://raw.githubusercontent.com/kadirikumar-uptycs/Tools/main/feedback.png",
                "alt_text": "Customer Feedback image"
            }
        }
    ]
}


let feedbackBlock = ({ questionNumber, score, feedback }) => {

    let starsBlock = Array.from({ length: score }, () => ({
        "type": "emoji",
        "name": "star2"
    }));

    let elements = [
        {
            "type": "rich_text_section",
            "elements": [
                {
                    "type": "text",
                    "text": `${questionNumber}. ${questions[questionNumber - 1]} \n`,
                    "style": {
                        "bold": true
                    }
                },
                ...starsBlock,
                {
                    "type": "text",
                    "text": ` (${score})`,
                    "style": {
                        "italic": true,
                        "bold": true
                    }
                }
            ]
        }
    ]
    if (feedback) {
        elements.push({
            "type": "rich_text_preformatted",
            "elements": [
                {
                    "type": "text",
                    "text": feedback
                }
            ]
        })
    }

    return {
        "type": "rich_text",
        elements,
    }

}


let slackMessageBody = (customerFeedback) => {
    customerFeedback ??= [];
    let fullMessageBody = [];
    for (let index = 0; index < 5; index++) {
        let feedback = customerFeedback[index];
        feedback ??= {};
        let singleBlock = feedbackBlock(feedback)
        fullMessageBody.push(singleBlock);
        fullMessageBody.push(messageDivider());
    }
    return fullMessageBody;
}

let slackMessageFooter = (comments, URL) => {
    let footerBlocks = [];
    if (comments) {
        footerBlocks.push({
            "type": "rich_text",
            "elements": [
                {
                    "type": "rich_text_section",
                    "elements": [
                        {
                            "type": "text",
                            "text": comments
                        }
                    ]
                }
            ]
        })
    }
    return [
        ...footerBlocks,
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "View Ticket » ",
                        "emoji": true
                    },
                    "value": "click_view_ticket",
                    "url": `${URL}`,
                    "action_id": "click_view_ticket"
                }
            ]
        }
    ]

}


let slackFeedbackMessageBlocks = (ticketInfo) => {
    let comments = "Comments"
    let customerFeedback = ticketInfo?.customerFeedback;
    if (Array.isArray(customerFeedback)) {
        comments = customerFeedback.at(-1)?.comments;
    }
    let headers = slackMessageHeader(ticketInfo);
    let body = slackMessageBody(ticketInfo?.customerFeedback)
    let footerBlocks = slackMessageFooter(comments, ticketInfo?.URL);

    return [
        ...headers,
        messageDivider(),
        ...body,
        ...footerBlocks
    ]
}

module.exports = slackFeedbackMessageBlocks;