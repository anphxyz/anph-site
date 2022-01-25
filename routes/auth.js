/**
* @author ANPH
* @created 23/02/2022
*/
const router = require('express').Router();
const { authenticateToken } = require('../utils/tokenManager');
const auth = require('../controllers/auth');
/**
* @middleware that is specific to this router
*/
router.post('/register', auth.register);

router.get('/active', auth.active);

router.post('/login', auth.login);

router.delete('/logout', auth.logout);

router.post('/user_detail', authenticateToken, auth.user_detail);

module.exports = router;