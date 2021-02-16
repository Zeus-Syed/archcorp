const mongoose = require('mongoose');
require('../models/ArchCorp');
const ArchCorpModel = mongoose.model('ArchCorp');
const shortId = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib');
const check = require('../libs/checkLib');
const logger = require('../libs/loggerLib');


let getAllRecords = (req, res) => {
    let temp = {};
    if(req.body.client){
       temp.fromClient = req.body.client
    }
    if(req.body.authority){
        temp.authority = req.body.authority
     }
     if(req.body.rDocs){
        temp.documentRequirements = req.body.rDocs
     }
     if(req.body.aDocs){
        temp.actualDocumentRequirements = req.body.aDocs
     }
     if(req.body.approvals){
        temp.noOfApprovals = req.body.approvals
     }
     
    // let temp = {
    //     // authority: undefined,
    //     // noOfApprovals: undefined,
    //     // documentRequirements: undefined,
    //     // actualDocumentRequirements: undefined,
    //     // fromClient: undefined
    //     fromClient: "mai dubai"
    // };
    ArchCorpModel.find(temp)
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

let createArchCorpList = (req, res) => {
    ArchCorpModel.findOne({archCorpId: "BKAJA876"}).exec((err, retrievedDetails) => {
        if (err) {
            logger.error(err.message, 'expenseController: expenseCreate()', 10);
            let apiResponse = response.generate(true, 'Failed to create expense', 500, null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(retrievedDetails)) {
          
            let newList = new ArchCorpModel({    
                archCorpId: shortId.generate(),
                authority: req.body.authority,
                noOfApprovals: req.body.noOfApprovals,
                documentRequirements: req.body.reqDocuments,
                actualDocumentRequirements: req.body.actDocuments,
                fromClient: req.body.client
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

let deleteArchCorpList = (req, res) => {
    ArchCorpModel.remove({'archCorpId':req.params.id}).exec((err, fetchedDetails)=>{
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

let editArchCorpList = (req, res) => {
    ArchCorpModel.findOne({'archCorpId':req.params.id}).exec((err, fetchedDetails)=>{
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
          
             ArchCorpModel.update({'archCorpId':req.params.id}, {    
                authority: req.body.authority,
                noOfApprovals: req.body.noOfApprovals,
                documentRequirements: req.body.reqDocuments,
                actualDocumentRequirements: req.body.actDocuments,
                fromClient: req.body.client
            }).exec((err, data)=>{
                logger.info('Edited Successfully!!', 'flightController: deleteList()', 10);
                let apiResponse = response.generate(false, 'Edited Successfully!!', 200, fetchedDetails);
                apiResponse.createdOn = time.now();
                res.send(apiResponse);
            })
         
        }
      })
}


module.exports = {
getAllRecords: getAllRecords,
createArchCorpList: createArchCorpList,
deleteArchCorpList: deleteArchCorpList,
editArchCorpList: editArchCorpList
}