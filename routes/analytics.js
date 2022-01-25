/**
 * @author ANPH
 * @created 23/02/2022
 */
const router = require('express').Router();
const analytics = require('../controllers/analytics');
const { authenticateToken } = require('../utils/tokenManager');
/**
* @middleware that is specific to this router
*/
router.post('/', authenticateToken, analytics.report);


module.exports = router;