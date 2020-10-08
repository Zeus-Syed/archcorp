const userController = require('../controller/UserController')

let setRouter = (app) =>{

    let baseUrl = `/user`;

    app.post(`${baseUrl}/login`, userController.loginFunction);


    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    app.post(`${baseUrl}/createman`, userController.signUpFunction);
}

module.exports = {
    setRouter: setRouter
}

