const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlwares = require('./middlewares');
const LogsRouter = require('./api/LogsRouter');

const app = express();

//MongoDB connection
const port = process.env.PORT || 5000;


mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
});

mongoose.connection.once('open', () =>{
     console.log("MongoDB database connection established successfully");
});


//MIDDLEWARES
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
}));
app.use(express.json());//BodyParsing
//Route
app.get('/', (req,res) => {
    res.json({
        message: "Hello ninja !"
    });
});

//Router
app.use('/api/logs',LogsRouter);

//NotFound error handling MIDDLEWARE (always add it before the error handling middlware)
app.use(middlwares.notFound);
//General Error handling MIDDLEWARE
app.use(middlwares.errorHandler);




app.listen(port,() => {
    console.log(`Listening at http://localhost/${port} !`);
});