
exports.report = async (req, res) => {
    const { google } = require('googleapis')
    const scopes = ['https://www.googleapis.com/auth/analytics.readonly']

    const jwt = new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY,
        scopes,
    });

    const response = await jwt.authorize()

    console.log('>>>', response)

    const result = await google.analytics("v3").data.ga.get({
        "auth": jwt,
        "ids": "ga:" + 'G-EG9C1WYH2V',
        "start-date": "30daysAgo",
        "end-date": "today",
        "metrics": "ga:pageviews"
    })

    return res.send(result)

}