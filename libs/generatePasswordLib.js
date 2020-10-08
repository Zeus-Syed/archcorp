const bcrypt  = require('bcrypt');

const saltRounds = 10;

let logger = require('./loggerLib');

let hashPassword = (typedPassword) =>{
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(typedPassword, salt);
    return hash;
}
let comparePassword = (typedPassword, retrivedPassword, cb) =>{
    //console.log(typedPassword);
    //console.log(retrivedPassword);
    bcrypt.compare(typedPassword, retrivedPassword, (err, res) =>{
        if(err){
            logger.error(err.message, 'Comparison Error', 6);
            cb(err, null);
        }
        else{
            cb(null,res);
        }
    })
}

module.exports = {
    hashPassword:hashPassword,
    comparePassword: comparePassword
}