
//Validation. Using the package Joi to do so, which sends out automatical message
const Joi = require('@hapi/joi');

//Register validation
//This does so that users inpiuts are checked. 
//User are not allowed to enter a full name with less than 2 characters, password with 6 and username with 6 characters. 
const registerValidation = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().min(2).required(),
        userName: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}
//Login validation
//Checking so that users input is more than 6 characters long. Else an error message will be sent. 
const loginValidation = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
