
exports.report = async (req, res) => {
    const { dettachPostData } = require('../utils')
    const { view_id } = dettachPostData(req);
    const pageViews = await getGReport(view_id, 'ga:screenviews, ga:pageviews, ga:users');

    const total = pageViews.data.totalsForAllResults || {}
    return res.send({
        // + The number of app screens or web pages your users viewed. Repeated views of a single page or
        // screen are counted (screen_view + page_view events).
        'screens and pages view': +total['ga:screenviews'] + +total['ga:pageviews'],
        // + The number of distinct users who have logged at least one event, regardless of whether the site or
        // app was in use when that event was logged.
        '': 0,
        // + The number of distinct users who visited your site or app
        'total user': +total['ga:users'],
    })

}

const getGReport = async (view_id, metrics) => {
    const { google } = require('googleapis')
    const scope = ['https://www.googleapis.com/auth/analytics.readonly'];
    const jwt = new google.auth.JWT(process.env.GOOGLE_CLIENT_EMAIL, null,
        process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scope, null);

    await jwt.authorize((error, tokens) => {
        if (error) {
            console.error('Error connecting to GA:', error);
        } else {
            console.log('Authorized!', tokens);
        }
    })

    return await google.analytics('v3').data.ga.get({
        'auth': jwt,
        'ids': 'ga:' + view_id,
        'start-date': '30daysAgo',
        'end-date': 'today',
        'metrics': metrics
    })

}
