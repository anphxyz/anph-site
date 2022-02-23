const showdown = require('showdown');
converter = new showdown.Converter();

exports.loadPost = async (req, res) => {
    if (typeof req.body.content == 'undefined' || req.body.content == null)
        return res.json(["error", "No data found"]);
    
    text = req.body.content;
    html = converter.makeHtml(text);
    return res.json(["markdown", html]);
}