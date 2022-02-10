exports.dettachPostData = req => JSON.stringify(req.body).length === 2 ? req.fields : req.body;
