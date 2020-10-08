const flightController = require('../controller/FlightController')

let setRouter = (app) =>{

    let baseUrl = `/flight`;

    app.get(`${baseUrl}/getall`, flightController.getAllFlights);


    app.post(`${baseUrl}/createflight`, flightController.createFlightList);

    app.post(`${baseUrl}/delete/:countryId`, flightController.deleteFlightList);
}

module.exports = {
    setRouter: setRouter
}

