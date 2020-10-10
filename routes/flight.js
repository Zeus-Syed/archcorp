const flightController = require('../controller/FlightController')
const auth = require('../middlewares/AuthMiddle');

let setRouter = (app) =>{

    let baseUrl = `/flight`;

    app.get(`${baseUrl}/getall`, flightController.getAllFlights);


    app.post(`${baseUrl}/createflight`, flightController.createFlightList);

    app.post(`${baseUrl}/delete/:countryId/:authToken`, auth.isAuthenticated, flightController.deleteFlightList);
}

module.exports = {
    setRouter: setRouter
}

