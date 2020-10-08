const logger = require('pino')()
const time = require('../libs/timeLib');
//const moment = require('moment')

let captureError = (errorMessage, errorOrigin, errorLevel) => {
     let currentTime = time.convertToLocalTime();

     let errorResponse ={
         timestamp: currentTime,
         errorMessage: errorMessage,
         errorOrigin: errorOrigin,
         errorLevel: errorLevel
     }
     logger.error(errorResponse)
     return errorResponse
}

let captureInfo = (message, origin, importance) => {
    let currentTime = time.convertToLocalTime()

    let infoMessage = {
        timestamp: currentTime,
        message: message,
        origin: origin,
        importance: importance
    }
    logger.info(infoMessage);
    return infoMessage;
}

module.exports = {
    error : captureError,
    info: captureInfo
}