const { generateAccessToken, checkExistRefreshToken } = require('../utils/tokenManager');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { dettachPostData } = require('../utils')

exports.refresh = async (req, res) => {
    const { email, token: refreshToken } = dettachPostData(req);
    // validate email
    if (!validator.isEmail(email)) {
        return res.status(400).send({ message: 'Email is invalid' });
    }
    const authDis = require('../utils/redisHelper').build('AUTH')
    const user = await authDis.get(email);
    // not found user
    if (!user) {
        return res.status(400).send({ message: 'Email is not found!' });
    }
    // emty token
    if (refreshToken == null)
        return res.sendStatus(401)

    // refresh token not in list
    const isExistToken = await checkExistRefreshToken(email, refreshToken);

    log.error('>>isExistToken', isExistToken);
    if (!isExistToken)
        return res.sendStatus(403)

    // verify refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403)

        const accessToken = generateAccessToken(user)
        res.json({ accessToken })
    })
}
