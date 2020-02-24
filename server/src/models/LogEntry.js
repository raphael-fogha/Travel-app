const mongoose = require('mongoose');

const {Schema} = mongoose;
// = const Schema = mongoose.schema
const requiredString = {
    type: String,
    required:true,
};

const LogEntrySchema = new Schema ({
    title: requiredString,
    description: String,
    comment: String,
    image: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    latitude:{
        type:Number,
        required:true,
        min:-90,
        max:90,
    },
    longitude:{
        type:Number,
        required:true,
        min:-180,
        max: 180,
    },
    visitDate:{
        type:Date,
        required:true
    }}, {
      timestamps: true
    

});

const LogEntry = mongoose.model('LogEntry', LogEntrySchema);

module.exports = LogEntry;