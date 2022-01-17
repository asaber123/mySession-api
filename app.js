
//importing packages
const { raw } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
require("dotenv/config");
const bodyParser = require('body-parser');
const cors = require('cors');
const session =require('express-session');

//import routes
const routesAuth = require('./routes/auth');
const routesClimbingRoute = require('./routes/climbingRoutes');
const { populate } = require('./models/Routes');
const verifyToken = require('./verifyToken');



//exicute packages
const app =express();
//Requires to deploy at heroku. 


port = process.env.PORT || 3001;

//makes a body when we do post request
app.use(express.json());
//Taking away cors issues. 
app.use(cors());

//CReating a middlewere that exicutes everytime the route is running. 

app.use(bodyParser.json());




//creating our routes as a middlewere
app.use('/api', routesClimbingRoute)
app.use('/auth', routesAuth)


//routes homepage
app.get('/', (req, res) =>{
    let username=''
    if(req.session.username) username= req.session.username
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
