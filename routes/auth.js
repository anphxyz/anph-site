/**
 * @author ANPH
 * @created 23/02/2022
 */
const router = require('express').Router();
const { authenticateToken } = require('../util/tokenManager');
const auth = require('../.history/controllers/auth');
/**
* @middleware that is specific to this router
*/

router.post('/register', auth.register);

router.post('/active', auth.active);

router.post('/login', auth.login);

router.delete('/logout', auth.logout);

router.post('/user_detail', authenticateToken, (req, res) => { });




module.exports = router;