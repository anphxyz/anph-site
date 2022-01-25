/**
 * @author ANPH
 * @created 23/02/2022
 */
const router = require('express').Router();
const token = require('../controllers/token');
/**
* @middleware that is specific to this router
*/
router.post('/', token.refresh);


module.exports = router;