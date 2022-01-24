/**
 * @author ANPH
 * @created 23/02/2022
*/
const tokenDis = require('./redisHelper').build('TOKEN');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

exports.generateAccessToken = (data, expiresIn = '1h') => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
}

exports.generateRefreshToken = async (data) => {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
    await tokenDis.set(token, token);
    return token;
}

exports.removeRefreshToken = async (token) => {
    await tokenDis.del(token);
}