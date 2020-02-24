//NotFound error handling MIDDLEWARE (always add it before the general error handling middlware)

const notFound = (req,res,next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
//General Error handling MIDDLEWARE
const errorHandler = (error,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'Blank' :error.stack
    });
};

module.exports = {
    notFound,
    errorHandler
};