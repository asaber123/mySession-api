const { raw } = require('body-parser');
const express = require('express');
const router = express.Router();
const Route = require('../models/Routes');
const verify = require('./verifyToken');

router.use(verify)

//Routes

//Get back all information about the toutes that is saved. 
router.get('/', async (req, res) => {
    try {
        const userName = req.userName
        // console.log(`Getting routes for user ${userName}`)}
        //TODO get routes for username
        const routes = await Route.find({user: userName});
        res.json(routes);

    } catch (err) {
        res.json({ message: err });
    }
})

//Posts information about a new route
router.post('/',  async (req, res) => {
    const route = await new Route({
        grade: req.body.grade,
        name: req.body.name,
        location: req.body.location,
        typeOfRoute: req.body.location,
        user: req.userName
        });

    //Saving data to database
    try {
        console.log(route)
        console.log(req.body)
        const savedRoute = await route.save()
        res.json(savedRoute);
    } catch (err) {
        res.json({ message: err });
    }
})

//Get a specific route
router.get('/:id', async (req, res) => {
    try {
        // const userName = req.user.userName
        // console.log(`Getting route for user ${userName}`)
        const route = await Route.findById(req.params.id);
        res.json(route);
    } catch (err) {
        res.json({ message: err });
    }
})

//Delete a speacific route. 
router.delete('/:id', async (req, res) => {
    try {
        // const userName = req.user.userName
        // console.log(`Deleting route for user ${userName}`)
        //TODO verify that the route belongs to the user
        //Removing the object that match the same id as the id that was sent in the url 
       const deletedRoute = await Route.remove({_id: req.params.id})
       res.json ('deleted log:');
    } catch (err) {
        res.json({message: err});
    }
})

//Updating data from an object
router.patch('/:id', async (req, res) => {
    try {
        // const userName = req.user.userName
        // console.log(`Updating route for user ${userName}`)
        //Removing the object that match the same id as the id that was sent in the url 
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

