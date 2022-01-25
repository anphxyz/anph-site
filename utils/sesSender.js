exports.sendActive = (email, code) => {
    const AWS = require('aws-sdk'); // bạn cần add thư viện aws-sdk: yarn add aws-sdk

    // Thông tin SES_AWS_ACCESS_KEY_ID, SES_AWS_SECRET_ACCESS_KEY nằm trong file credentials bạn đã download về ở trên nhé
    const sesConfig = {
        accessKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
        region: process.env.SES_REGION, // đây là region của server nó là vùng bạn đã chọn khi tạo ses nếu Mumbai là ap-south-1
        apiVersion: '2010-12-01', // version của api
    }

    const sesAws = new AWS.SES(sesConfig);

    const params = {
        Destination: {
            ToAddresses: [// email người nhận
                email
            ]
        },
        Message: {
            Subject: {
                Data: '[ANPH.XYZ] Activate your account', // subject
                Charset: 'UTF-8',
            },
            Body: {
                Text: {
                    Data: `Please click to link above to activate your account:
                    
                    https://anph.xyz/activate?t=${code}`, // nội dung email
                    Charset: 'UTF-8'
                }
            }
        },
        Source: process.env.SES_AWS_SMTP_SENDER, // email dùng để gửi đi
    }
    return sesAws.sendEmail(params).promise();
}