const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs')
const http = require('http')
const mongoose = require('mongoose')
const appConfig = require('./config/config');
mongoose.set('useCreateIndex',true)
const bodyParser = require('body-parser');
const logger = require('./libs/loggerLib');
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function(file){
    if(~file.indexOf('.js')){
        console.log(routesPath +'/'+file)
        let route = require(routesPath +'/'+file)
        route.setRouter(app);
    }
})

const server = http.createServer(app)
// start listening to http server
console.log(appConfig)
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true })
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})

mongoose.connection.on('error', function(err){
    console.log('database connection error');
    console.log(err);
})

mongoose.connection.on('open', function(err){
    if(err){
        console.log('database err');
    }
    else{
        console.log('Database connection successfull')
    }
})