const mongoose = require('mongoose');
require('../models/Auth');
const AuthModel = mongoose.model('Auth');
const logger = require('../libs/loggerLib')
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const response = require('../libs/responseLib')

let isAuthenticated = (req, res, next) => {
      console.log("auth check called");
    if(req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')){
        AuthModel.findOne({authToken: req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')},(err, fetchedDetails)=>{
            if(err){
                logger.error('Some error','AuthMiddle:isAuthenticated',7)
        let apiResponse = response.generate(true, "Some error occured",500,null);
        res.send(apiResponse);
            }
            else if(check.isEmpty(fetchedDetails)){
                logger.error('CHECKKInvalid or expired Auth Token','AuthMiddle:isAuthenticated',7)
        let apiResponse = response.generate(true, "Invalid or expired Auth Token",404,null);
        res.send(apiResponse);
            }
            else{
                token.verifyToken(fetchedDetails.authToken, fetchedDetails.tokenSecret, (err, decoded)=>{
                    if(err){
                        logger.error(err.message,'AuthMiddle:isAuthenticated',7);
        let apiResponse = response.generate(true, "failed to verify token",404,null);
        res.send(apiResponse);
                    }
                    else{
                        req.user ={userId: decoded.data.userId};
                        next()
                    }
                }); // verifyToken
            }
        }) // findOne


    }
    else{
        logger.error('AuthToken is missing','AuthMiddle:isAuthenticated',7)
        let apiResponse = response.generate(true, "Auth Token is missing",404,null);
        res.send(apiResponse);
    }
}

module.exports = {
    isAuthenticated: isAuthenticated
}