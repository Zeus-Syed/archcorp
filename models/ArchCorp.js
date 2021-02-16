const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let  archCorpSchema = new Schema({
    archCorpId : {
        type: String,
        unique: true
    },
    authority: {
        type: String
    },
    noOfApprovals : {
        type: Number
    },
    documentRequirements : {
        type: String
    },
    actualDocumentRequirements : {
        type: String
    },
    fromClient: {
        type: String
    }
}) ;

mongoose.model('ArchCorp', archCorpSchema);