
// The following environment variable is set by app.yaml when running on App
// Engine, but will need to be set manually when running locally. See README.md.
// await trackEvent(
//     'Example category',
//     'Example action',
//     'Example label',
//     '100'
// );
// res.status(200).send('Event tracked.').end();
exports.trackEvent = (category, action, label, value) => {
    const params = {
        // API Version.
        v: '1',
        // Tracking ID / Property ID.
        tid: process.env.GA_TRACKING_ID,
        // Anonymous Client Identifier. Ideally, this should be a UUID that
        // is associated with particular user, device, or browser instance.
        cid: '555',
        // Event hit type.
        t: 'event',
        // Event category.
        ec: category,
        // Event action.
        ea: action,
        // Event label.
        el: label,
        // Event value.
        ev: value,
    };

    return fetch('http://www.google-analytics.com/debug/collect', {
        params
    });
};
