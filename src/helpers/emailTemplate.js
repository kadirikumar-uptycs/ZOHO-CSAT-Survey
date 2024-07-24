const emailTemplate = (ticketId, ticketNumber, customerName, server_base_url, ticketSubject, ticketOwnerFullName) => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uptycs Service Feedback</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: Arial, sans-serif;
            background-color: #f4f7fa;
        }
        .card {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: 450px;
            margin: 0 auto;
        }
        .header {
            background: linear-gradient(135deg, #6200ee, #9d4edd);
            color: white;
            padding: 25px;
            text-align: center;
            font-size: 28px;
            font-weight: 500;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        p {
            line-height: 1.6;
            margin-bottom: 15px;
        }
        .logo {
            max-width: 180px;
            margin-bottom: 25px;
        }
        strong {
            color: #6200ee;
        }
        .label strong{
            color: #5d60b9;
        }
        .button {
            background: linear-gradient(135deg, #6200ee, #9d4edd);
            color: white;
            border: none;
            padding: 12px 25px;
            font-size: 16px;
            border-radius: 30px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
        }
        .footer {
            padding: 20px;
            text-align: left;
            font-size: 13px;
            color: #666;
            border-top: 1px solid #f1f1f1;;
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>

<body>
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f7fa;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table class="card" width="450" cellspacing="0" cellpadding="0" border="0" style="background-color: white; border-radius: 12px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td class="header" style="background: linear-gradient(135deg, #6200ee, #9d4edd); color: white; padding: 25px; text-align: center; font-size: 28px; font-weight: 500;">
                            We Value Your Feedback
                        </td>
                    </tr>
                    <tr>
                        <td class="content" style="padding: 30px; text-align: center;">
                            <img src="https://raw.githubusercontent.com/kadirikumar-uptycs/Tools/main/uptycs_logo.png" alt="Uptycs Logo" title="Uptycs Logo" class="logo" style="max-width: 180px; margin-bottom: 25px;">
                            <p>Hello <strong style="color: #6200ee;">${customerName}</strong>,</p>
                            <p>We'd love to hear your thoughts on our customer service. Your feedback is crucial in helping us improve.</p>
                            <p class="label"><strong style="color: #5d60b9;">Please take a moment to rate your recent support experience with ticket #${ticketNumber}:</strong></p>
                            <a href="${server_base_url}/${ticketNumber}?id=${ticketId}&subject=${ticketSubject}&agent=${ticketOwnerFullName}" class="button" style="background: linear-gradient(135deg, #6200ee, #9d4edd); color: white; border: none; padding: 12px 25px; font-size: 16px; border-radius: 30px; text-decoration: none; display: inline-block; margin-top: 20px;">
                                <font color="#FFF">Provide Feedback</font>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer" style="padding: 20px; text-align: left; font-size: 13px; color: #666; border-top: 1px solid #f1f1f1;">
                            <p style="margin: 5px 0;font-family: serif;">Uptycs, Inc</p>
                            <p style="margin: 5px 0;font-family: serif;">404 Wyman Ave.</p>
                            <p style="margin: 5px 0;font-family: serif;">Suite 357</p>
                            <p style="margin: 5px 0;font-family: serif;">Waltham, MA 02451</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`
}

module.exports = emailTemplate;