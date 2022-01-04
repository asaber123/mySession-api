const jwt = require('jsonwebtoken');


//Creating a middlewere funciton that can be added to any routes that I want to have protected or private. 
//The token is then only valid if the user is logged in. 
module.exports= function (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(400).send('Acess dinied')

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).send('Invalid token')
    }
}