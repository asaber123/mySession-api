
//importing packages
const { raw } = require('express');
const express = require('express');
const mongoose = require('mongoose');
require("dotenv/config");

//exicute packages
const app =express();
const port = 3001;


//makes a body when we do post request
app.use(express.json());

//CReating a middlewere that exicutes everytime the route is running. 
// app.use('/sessions')

//Routes
app.get('/', (req, res) =>{
    res.send('We are homepage');
})

//Connecting to our database which has the uri connection stored in .env. This string can be used though the package dotenv and to do so process.env.databaseurlvariable. 
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, () =>console.log("Connected to db"));



//listening to the server
app.listen(port,() =>{
    console.log(`listening at http://localhost${port}`)
});
