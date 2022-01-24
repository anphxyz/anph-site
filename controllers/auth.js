
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const authDis = require('../util/redisHelper').build('AUTH')
const crypto = require('crypto');
const validator = require('validator');

exports.register = async (req, res) => {
    const {
        email = '',
        password = '',
        confirmPassword = '',
        phoneNumber = ''
    } = req.body;
    // validate phone number
    if (!validator.isMobilePhone(phoneNumber, 'vi-VN')) {
        return res.status(400).send({ message: 'Phone number is invalid' });
    }
    // validate email
    if (!validator.isEmail(email)) {
        return res.status(400).send({ message: 'Email is invalid' });
    }
    // validate password
    if (password !== confirmPassword) {
        return res.status(400).send({ message: 'Password is invalid' });
    }
    // validate strong password
    // if (!validator.isStrongPassword(password)) {
    //     /**
    //      * {    minLength: 8, 
    //      *      minLowercase: 1, 
    //      *      minUppercase: 1, 
    //      *      minNumbers: 1, 
    //      *      minSymbols: 1, 
    //      *      returnScore: false, 
    //      *      pointsPerUnique: 1, 
    //      *      pointsPerRepeat: 0.5, 
    //      *      pointsForContainingLower: 10,
    //      *      pointsForContainingUpper: 10, 
    //      *      pointsForContainingNumber: 10, 
    //      *      pointsForContainingSymbol: 10 
    //      * }
    //      */
    //     return res.status(400).send({ message: 'Password is invalid' });
    // }

    await authDis.set(email, {
        email,
        phoneNumber,
        password: crypto.createHash('md5').update(password).digest("hex")
    });

    return res.status(200).send({ message: 'Register success' });
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.active = (req, res) => { }
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.login = (req, res) => {
    // Authenticate User
    const username = req.body.username
    const password = req.body.password
    const user = { name: username }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    return res.json({ accessToken: accessToken, refreshToken: refreshToken })
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.user_detail = (req, res) => {

}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.logout = (req, res) => { }


