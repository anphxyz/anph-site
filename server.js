const express = require('express')
const morgan = require('morgan')
const app = express()
const server = require('http').createServer(app)
const formidable = require('express-formidable');
//global
global.log = require('alog-xyz').getLogger({ mode: 'development', dirpath: __dirname, lohName: 'ANPH.XYZ' })
// use middleware
app.use(express.json())
//don't show the log when it is test
if (process.env.NODE_ENV !== 'TEST') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}
app.use(express.static('html'))
app.use(formidable());
//

// All Router
app.use('/', require('./routes/auth'))
app.use('/token', require('./routes/token'))
app.use('/analytics', require('./routes/analytics'))

/**
 * 
 */
app.get('/')
app.get('/about', async (_, res) => res.status(200).sendFile('./html/index.html', { root: __dirname }));
/**
 * 
 */
const { PORT, NODE_ENV } = process.env
server.listen(PORT, () => log.info(`server started..`, { NODE_ENV, PORT }))

require('dotenv').config();

//for test: without this thrown   TypeError: app.address is not a function
module.exports = server;
