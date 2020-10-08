const jwt = require('jsonwebtoken')
const shortId = require('shortid')
const secretKey = "ThisIsVeryImportantSecretKey";


let generateToken = (data, cb) => {
    try{
  
let claims = {
    jwtid: shortId.generate(),
    iat: Date.now(),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
    sub: 'authToken',
    iss: 'syChat',
    data: data
}
let tokenDetails = {
    token: jwt.sign(claims, secretKey),
    tokenSecret: secretKey
}
cb(null, tokenDetails);
   }
    catch(err){
    console.log(err)
    cb(err, null)
    }
}

let verifyClaim = (token, secretKey, cb) => {
    jwt.verify(token, secretKey, function(err, decoded){
     if(err){
        console.log('error while verify token');
        console.log(err);
        cb(err, null) 
     }
     else{
         console.log("User Verified");
         console.log(decoded);
         cb(null, decoded);
     }
        
    } );
}

let verifyClaimWithoutSecret = (token, cb) =>{
    jwt.verify(token, secretKey, function(err, decoded){
        if(err){
            console.log('error while verify token');
        console.log(err);
        cb(err, null); 
        }
        else{
            console.log('User Verified');
            cb(null, decoded);
        }
    });
}


module.exports = {
    generateToken: generateToken,
    verifyToken: verifyClaim,
    verifyClaimWithoutSecret: verifyClaimWithoutSecret
}
