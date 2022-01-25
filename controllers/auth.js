
/**
 * @POST
 * @param {
 *  email
 *  password
 *  confirmPassword
 *  phoneNumber
 * } req.body
 */
const crypto = require('crypto');
const validator = require('validator');
const aes = require('../utils/aesHelper');


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
    const authDis = require('../utils/redisHelper').build('AUTH')
    const user = await authDis.get(email);
    if (user) {
        return res.status(400).send({ message: 'Email is existed' });
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
    // store user
    await authDis.set(email, {
        id: crypto.randomBytes(16).toString('hex'),
        email,
        phoneNumber,
        password: crypto.createHash('md5').update(password).digest("hex"),
        active: false
    });
    // send email active
    await sendEmailActive(email);
    //
    return res.send({ message: 'Register success' });
}

async function sendEmailActive(email) {
    // create active token
    const activeToken = encodeURIComponent(aes.encrypt([email, new Date()].join('##')));
    // send email
    const { sendActive } = require('../utils/sesSender');
    return await sendActive(email, activeToken);
}



/**
 * @POST
 * @param {
 *  email
 *  password
 * } req.body
 */
exports.active = async (req, res) => {
    const token = req.query.t || '';
    if (!token) {
        return res.status(400).send({ message: 'Token is invalid' });
    }
    // create active token
    const [email, time] = decodeURIComponent(aes.decrypt(token)).split('##');
    // prevent come from future
    if (new Date(time) > new Date()) {
        return res.status(400).send({ message: 'Do you come form future?' });
    }
    const authDis = require('../utils/redisHelper').build('AUTH')
    const user = await authDis.get(email);

    if (!user) {
        return res.status(400).send({ message: 'Account not found!' });

    }
    await authDis.set(email, {
        ...user, active: true
    });

    return res.send({ message: 'Your account has been actived successfully!' });
}


/**
 * @POST
 * @param {
 *  email
 *  password
 * } req.body
 */
exports.login = async (req, res) => {

    log.error('login', req.body);

    const {
        email = '',
        password = ''
    } = req.body;
    const authDis = require('../utils/redisHelper').build('AUTH')
    const user = await authDis.get(email);
    console.log('user', user);
    // not found user
    if (!user) {
        return res.status(400).send({ message: 'Email is not found!' });
    }

    // check password
    if (user.password !== crypto.createHash('md5').update(password).digest("hex")) {
        return res.status(400).send({ message: 'Password is invalid!' });
    }

    //check active 
    if (!user.active) {
        return res.status(400).send({ message: 'User is not active!' });
    }

    // Authenticate User
    const { generateAccessToken, generateRefreshToken } = require('../utils/tokenManager');
    return res.json({
        accessToken: generateAccessToken(user),
        refreshToken: await generateRefreshToken(user)
    })
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.user_detail = async (req, res) => {
    const email = req.body.email || '';
    const authDis = require('../utils/redisHelper').build('AUTH')
    const user = await authDis.get(email);
    return res.json(user);
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.logout = (req, res) => {
    const { removeRefreshToken } = require('../utils/tokenManager');
    removeRefreshToken(req.body.email)
    res.sendStatus(204)
}


