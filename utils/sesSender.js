exports.sendActive = (email, code) => {
    const AWS = require('aws-sdk');

    const sesConfig = {
        accessKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
        region: process.env.SES_REGION,
        apiVersion: '2010-12-01',
    }

    const sesAws = new AWS.SES(sesConfig);

    const params = {
        Destination: {
            ToAddresses: [
                email
            ]
        },
        Message: {
            Subject: {
                Data: '[ANPH.XYZ] Activate your account',
                Charset: 'UTF-8',
            },
            Body: {
                Text: {
                    Data: `Please click to link above to activate your account:
                    
                    https://anph.xyz/activate?t=${code}`,
                    Charset: 'UTF-8'
                }
            }
        },
        Source: process.env.SES_AWS_SMTP_SENDER,
    }
    return sesAws.sendEmail(params).promise();
}