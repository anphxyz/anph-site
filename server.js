const express = require('express')
const app = express()
const server = require('http').createServer(app)
app.use(express.json())
//
global.log = require('alog-xyz').getLogger({ mode: 'development', dirpath: __dirname, lohName: 'ANPH.XYZ' })


app.use('/', require('./routes/auth'))

app.use('/token', require('./routes/token'))

app.get('/', async (req, res) => {
    console.log('>> Anph webinaris 4.0 chat server running... ');
    // const aes = require('./util/aesHelper')
    // var hw = aes.encrypt("Some serious stuff")
    // console.log(hw)
    // console.log(aes.decrypt(hw))

    return res.status(200).send({ status: 'success', elements: 'Welcome to anph.xyz!' })
});


const { PORT, NODE_ENV } = process.env
server.listen(PORT, () => log.info(`server started..`, { NODE_ENV, PORT }))


require('dotenv').config();

//for test: without this thrown   TypeError: app.address is not a function
module.exports = server;
