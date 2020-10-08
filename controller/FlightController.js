const mongoose = require('mongoose');
require('../models/flight');
const FlightModel = mongoose.model('Flight');
const shortId = require('shortid');
const time = require('../libs/timeLib')
const token = require('../libs/tokenLib')
const passwordLib = require('../libs/generatePasswordLib')
const response = require('../libs/responseLib')
const check = require('../libs/checkLib')
const validateInput = require('../libs/paramsValidationLib');
const logger = require('../libs/loggerLib')


let getAllFlights = (req, res) => {
    FlightModel.find()
.select('-__v -_id')
.lean()
.exec((err, fetchedDetails)=>{
  if(err){
    logger.error('Failed to fetch all histories', 'flightController: getAllLists()', 10)
    let apiResponse = response.generate(true, 'Failed to fetch lists', 500, null)
    res.send(apiResponse);
  }
  else if(check.isEmpty(fetchedDetails)){
    logger.error('No lists found', 'flightController: getAllLists()', 10)
    let apiResponse = response.generate(true, 'NO lists found', 404, null)
    res.send(apiResponse);
  }
  else{
    logger.info('Flight Lists found', 'flightController: getAllLists()', 10)
    let apiResponse = response.generate(false, 'Flight lists Found!!!', 200, fetchedDetails)
    res.send(apiResponse);
  }
})
}

let createFlightList = (req, res) => {
    FlightModel.findOne({ countryName: req.body.countryName }).exec((err, retrievedDetails) => {
        if (err) {
            logger.error(err.message, 'expenseController: expenseCreate()', 10);
            let apiResponse = response.generate(true, 'Failed to create expense', 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(retrievedDetails)) {
          
            let newList = new FlightModel({    
                countryId: shortId.generate(),
                countryName: req.body.countryName,
                flightCount: req.body.flightCount,
                createdOn: time.now()
            })
            newList.save((err, result) => {
                if (err) {
                    logger.error(err.message, 'flightController: createFlight()', 10);
                    let apiResponse = response.generate(true, 'Failed to create flight', 500, null);
                    res.send(apiResponse);
                }
                else {
                    //let newGroupObj = result.toObject();

                    logger.info("flight list created Successfully!!", 'flightController: CreateFlight()', 10);
                    let apiResponse = response.generate(false, 'Flight list created Successfully!!', 200, result);
                    res.send(apiResponse);
                }
            })
        }
        else {
            logger.error('country already present', 'flightController: CreateFlight()', 10);
            let apiResponse = response.generate(true, 'Country already present', 500, null);
            res.send(apiResponse);
        }
    });
}

let deleteFlightList = (req, res) => {
    FlightModel.remove({'countryId':req.params.countryId}).exec((err, fetchedDetails)=>{
        if(err){
          logger.error('Failed to delete expense', 'flightController: deleteList()', 10)
          let apiResponse = response.generate(true, 'Failed to delete expense', 500, null)
          res.send(apiResponse);
        }
        else if(check.isEmpty(fetchedDetails)){
          logger.error('NOT DELETED', 'flightController: deleteList()', 10)
          let apiResponse = response.generate(true, 'NOT DELETED', 404, null)
          res.send(apiResponse);
        }
        else{
          logger.info('Deleted Successfully!!', 'flightController: deleteList()', 10);
          let apiResponse = response.generate(false, 'Deleted Successfully!!', 200, fetchedDetails);
          apiResponse.createdOn = time.now();
          res.send(apiResponse);
        }
      })
}


module.exports = {
getAllFlights: getAllFlights,
createFlightList: createFlightList,
deleteFlightList: deleteFlightList
}