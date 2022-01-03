
//Validation. Using the package Joi to do so, which sends out automatical message
const Joi = require('@hapi/joi');

//Register validation
const registerValidation =(data)=>{
const schema = Joi.object({
    fullName: Joi.string().min(2).required(),
    userName:Joi.string().min(6).required(),
    password:Joi.string().min(6).required(),
});
return schema.validate(data);
}
//Login validation
const loginValidation =(data)=>{
    const schema = Joi.object({
        userName:Joi.string().min(6).required(),
        password:Joi.string().min(6).required(),
    });
    return schema.validate(data);
    }

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
