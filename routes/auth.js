//This folder is responsible for the routes and requests that comes to the server. 
const { response } = require('express');
const express = require('express');
const router = express.Router()
//importing the schema that has been created
const signupTemplateCopy = require('../models/Signup')
//oackage to cryp password
const bcrypt =require('bcrypt')


//Validation. Using the package Joi to do so, which sends out automatical message
const Joi = require('@hapi/joi');

const schema = Joi.object({
    fullName: Joi.string().min(2).required(),
    userName:Joi.string().min(6).required(),
    password:Joi.string().min(6).required(),
});

//When a user press the submit button and send the form input, it sends a post request to this route. 
//When the router post will run, all functions inside will also run. 
//The first argument is the path, and the next argument is the callback function. 
router.post('/signup', async (req, res) =>{

    //Validate the data before making a user
    const {error} = schema.validate(req.body);
    res.send(error.details[0].message)

    //crypting password  by hashing and salt
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    //Making an instance of the model, takeing all the post requests and putting the values into the schema. 
    const signupUser = new signupTemplateCopy({
        fullName: req.body.fullName,
        userName: req.body.userName,
        password: securePassword,

    })
    try{
    const savedSignedupUser = await signupUser.save();
        res.send(savedSignedupUser);
    }
    catch(err){
        res.status(400).send(err);
    }


})

module.exports = router

//Creating a module schema by using mongoose. 