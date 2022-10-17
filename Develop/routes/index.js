const express = require('express');

// Import our modular routers for /notes

const noteRouter = require('./notes');


const app = express();


app.use('/notes', noteRouter);


module.exports = app;