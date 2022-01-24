require('dotenv').config()

const express = require('express')
const server = express()
server.use(express.json())
//
global.log = require('alog-xyz').getLogger({ mode: 'development', dirpath: __dirname, lohName: 'ANPH.XYZ' })


server.use('/', require('./routes/auth'))

server.use('/token', require('./routes/token'))


const { PORT, NODE_ENV } = process.env

server.listen(PORT, () => log.info(`server started..`, { NODE_ENV, PORT }))

//for test: without this thrown   TypeError: app.address is not a function
module.exports = server
