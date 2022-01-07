//This folder is responsible for the routes and requests that comes to the server. 
const { response } = require('express');
const express = require('express');
const router = express.Router()
//importing the schema that has been created
const signupTemplateCopy = require('../models/Signup')
//oackage to cryp password
const bcrypt = require('bcrypt')
const { registerValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');



//When a user press the submit button and send the form input, it sends a post request to this route. 
//When the router post will run, all functions inside will also run. 
//The first argument is the path, and the next argument is the callback function. 
router.post('/signup', async (req, res) => {

    //Validate the data before making a user, 
    const { error } = registerValidation(req.body);
    //if user did not type in correct, then the user will not be registered and an error message will be sent back. 
    if (error) return res.status(400).send({ message: error.details[0].message })

    //Checking if the user is alreddy in the database
    const userNameExists = await signupTemplateCopy.findOne({ userName: req.body.userName })
    //If the username alreddy exists a message will be sent
    if (userNameExists) return res.status(400).send({ message: 'Username alreddy existsts.' })

    //crypting password  by hashing and salt
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    //Creating a new user and making an instance of the model, 
    //takeing all the post requests and putting the values into the schema. 
    const signupUser = new signupTemplateCopy({
        fullName: req.body.fullName,
        userName: req.body.userName,
        password: securePassword,

    })
    try {
        const savedSignedupUser = await signupUser.save();
        res.send(savedSignedupUser)
    }
    catch (err) {
        res.status(400).send(err);
    }


})

//Login 
router.post('/login', async (req, res) => {


    //Validate the data before making a user, 
    const { error } = loginValidation(req.body);
    //if user did not type in correct, then the user will not be registered and an error message will be sent back. 
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    //Checking if the user exists
    const user = await signupTemplateCopy.findOne({ userName: req.body.userName });
    //If the username doesn not exists a message will be sent
    if (!user) {
        return res.status(400).send({ message: 'User does not exists' });
    }
    //Checking id password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    //If password is not valid
    if (!validPassword) {
        return res.status(400).send({ message: 'Username och password does not match. ' });
    }

    
    //Create and assign a token from the token package. This can be used to crypt and decrypt data. 
    //This is done to be able to send the username of the user to check if the user is logged in and verify that its the same user. 
    //This makes the user safe and make its not possible to hack the account.
    const token = jwt.sign({userName: user.userName}, process.env.TOKEN_SECRET)
    //Adding the data to the header in the fetch request
    res.header('auth-token', token).send({user:{user},message:{message:'sucess', token: token, username:user.userName}})

    

})

//Get user
router.get('/user', verify, async(req, res) =>{
    res.json({
        user:{
            username:'username'
        }
    })
})
// //logout
// router.post('/logout', async (req, res) => {
//     req.session.destroy(err=>{
//         res.redirect('/')
//     })
// })



module.exports = router

//Creating a module schema by using mongoose. 