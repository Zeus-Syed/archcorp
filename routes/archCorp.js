const archCorpController = require('../controller/ArchCorpController')
const auth = require('../middlewares/AuthMiddle');

let setRouter = (app) =>{

    let baseUrl = `/archcorp`;

    app.post(`${baseUrl}/getall`, archCorpController.getAllRecords);


    app.post(`${baseUrl}/createRecord`, archCorpController.createArchCorpList);

    app.post(`${baseUrl}/delete/:id/:authToken`, auth.isAuthenticated, archCorpController.deleteArchCorpList);

    app.post(`${baseUrl}/:id/editRecord`, archCorpController.editArchCorpList);
}

module.exports = {
    setRouter: setRouter
}

