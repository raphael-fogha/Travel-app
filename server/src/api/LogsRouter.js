/*const express = require('express');
const router = express.Router;*/
const {Router} = require('express');
const LogEntry = require('../models/LogEntry');
const router = Router();

router.get('/', (req,res,next) => {
   LogEntry.find()
    .then(LogEntries => res.json(LogEntries))
    .catch(err => next(err));
});

router.post('/', (req,res, next) => {

    const title = req.body.title;
    const description = req.body.description;
    const comment = req.body.comment;
    const image = req.body.image;
    const rating = req.body.rating;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const visitDate = req.body.visitDate;
    
    const newLogEntry = new LogEntry({
        title,
        description,
        comment,
        image,
        rating,
        latitude,
        longitude,
        visitDate,
    });

    newLogEntry.save()
        .then(() => {
            res.json("Entry added !");
        })
        .catch(err => {
            if(err.name === "ValidationError"){
                res.status(422);
        } 
        next(err)
        });


});

module.exports = router;
