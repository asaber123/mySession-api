
//importing packages
const { raw } = require('express');
const express = require('express');
const mongoose = require('mongoose');
require("dotenv/config");
const bodyParser = require('body-parser');
const cors = require('cors');

//import routes
const routesAuth = require('./routes/auth');
const routesClimbingRoute = require('./routes/climbingRoutes');
const { populate } = require('./models/Routes');


//exicute packages
const app =express();
const port = 3001;


//makes a body when we do post request
app.use(express.json());
app.use(cors());

//CReating a middlewere that exicutes everytime the route is running. 
app.use(bodyParser.json());



//creating our routes as a middlewere
app.use('/api', routesClimbingRoute)
app.use('/api', routesAuth)


//routes homepage
app.get('/', (req, res) =>{
    res.send('We are homepage');
})

//Connecting to our database which has the uri connection stored in .env. 
//This string can be used though the package dotenv and to do so process.env.databaseurlvariable. 
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, () =>console.log("Connected to db")
    );



//listening to the server
app.listen(port,() =>{
    console.log(`listening at http://localhost${port}`)
});
