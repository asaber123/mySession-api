const express = require('express');
const router = express.Router();
const Route = require('../models/Routes');

//Routes

//Get back all information about the toutes that is saved. 
router.get('/', async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);

    } catch (err) {
        res.json({ message: err });
    }
})

//Posts information about a new route
router.post('/', async (req, res) => {
    //Create a new post
    const route = new Route({
        grade: req.body.grade,
        name: req.body.name,
        location: req.body.location,
        typeOfRoute: req.body.location
    });

    //Saving data to database
    try {
        const savedRoute = await route.save()
        res.json(savedRoute);
    } catch (err) {
        res.json({ message: err });
    }
})

//Get a specific route
router.get('/:id', async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        res.json(route);
    } catch (err) {
        res.json({ message: err });
    }
})

//Delete a speacific route. 
router.delete('/:id', async (req, res) => {
    try {
        //Removing the object that match the same id as the id that was sent in the url 
       const deletedRoute = Route.remove({_id: req.params.id})
       res.json (deletedRoute);
    } catch (err) {
        res.json({ message: err });
    }
})

//Updating data from an object
router.patch('/:id', async (req, res) => {
    try {
        //Removing the object that match the same id as the id that was sent in the url 
       const updatedRoute = Route.updateOne(
           {_id: req.params.id},
           {$set:{
               grade:req.body.grade,
               name:req.body.name,
               location:req.body.location,
               typeOfRoute:req.body.typeOfRoute,
               date: req.body.date

           }})
       res.json (updatedRoute);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;

