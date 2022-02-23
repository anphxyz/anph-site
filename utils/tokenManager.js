/**
 * @author ANPH
 * @created 23/02/2022
*/
const jwt = require('jsonwebtoken');
/**
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
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
/**
 * @param {*} data 
 * @param {*} expiresIn 
 * @returns 
 */
exports.generateAccessToken = (data, expiresIn = '1h') => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
}
/**
 * 
 * @param {*} token 
 * @returns 
 */
exports.checkExistRefreshToken = async (email, refreshToken) => {
    const tokenDis = require('./redisHelper').build('TOKEN');
    const f5Token = await tokenDis.get(email);
    return !!f5Token && refreshToken === f5Token;
}
/**
 * @param {*} data 
 * @returns 
 */
exports.generateRefreshToken = async (user) => {
    const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    const tokenDis = require('./redisHelper').build('TOKEN');
    await tokenDis.set(user.email, token);
    console.log('>>generateRefreshToken', token)
    return token;
}
/**
 * @param {*} token 
 */
exports.removeRefreshToken = async (email) => {
    const tokenDis = require('./redisHelper').build('TOKEN');
    await tokenDis.del(email);
}
