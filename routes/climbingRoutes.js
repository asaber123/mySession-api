const express = require('express');
const router = express.Router();
const Route = require('../models/Routes');
const verify = require('../verifyToken');

//Using the module to verify the token. All requests in this route have to be verified first before the request can be done
router.use(verify)

//Routes

//Get back all information about the toutes that is saved. 
router.get('/', async (req, res) => {
    try {
        //Getting username that was stored in token. 
        //Then trying to find all loggs that was created from someone with the same username. 
        const userName = req.userName
        const routes = await Route.find({user: userName});
        res.json(routes);

    } catch (err) {
        res.json({ message: err });
    }
})

//Posts information about a new route. Stores the input data into an object. 
router.post('/',  async (req, res) => {
    const route = await new Route({
        grade: req.body.grade,
        name: req.body.name,
        location: req.body.location,
        typeOfRoute: req.body.location,
        user: req.userName,
      //  date: req.body.date
        });

    //Saving  teh data to database
    try {
        const savedRoute = await route.save()
        res.json(savedRoute);
    } catch (err) {
        res.json({ message: err });
    }
})

//Get a specific route with id. 
router.get('/:id', async (req, res) => {
    try {
        //Finding the log with the method findById. If log is found, then send it back to user. 
        const route = await Route.findById(req.params.id);
        res.json(route);
    } catch (err) {
        res.json({ message: err });
    }
})

//Delete a speacific route. 
router.delete('/:id', async (req, res) => {
    try {
        //Removing the object in the databse that match the same id as the id that was sent in the url 
       const deletedRoute = await Route.remove({_id: req.params.id})
       res.json ('deleted log:');
    } catch (err) {
        res.json({message: err});
    }
})

//Updating data from an object
router.patch('/:id', async (req, res) => {
    try {
        //Updating the object that match the same id as the id that was sent in the url. Using the method updateOne to update the objekct in the database. 
       const updatedRoute = await Route.updateOne(
           {_id: req.params.id},
           {$set:{
               grade:req.body.grade,
               name:req.body.name,
               location:req.body.location,
               typeOfRoute:req.body.typeOfRoute,
               date: req.body.date,
               user:req.body.user

           }})
       res.json (updatedRoute);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;

