const jwt = require('jsonwebtoken');


//Creating a middlewere funciton that can be added to any routes that I want to have protected or private. 
//The token is then only valid if the user is logged in. 
//The token gets created when user loggs in and send back as a message and set as header. 
module.exports= function (req,res,next){
    const authHeader = req.headers.authorization;
    if (authHeader) {
        //Storing token value into variable token. 
        const token = authHeader.split(' ')[1];
        //Verryfying token. 
        jwt.verify(token, process.env.TOKEN_SECRET, (err, claims) => {
            if (err) {
                console.log(`Error ${err}`)
                return res.sendStatus(403);
            }
            //Requiring user name, taken from claims that is stored in the token. This can now be used when user is logged in to identify user. 
            req.userName = claims.userName;
            next();
        });
    } else {
        console.log("No token")
        res.sendStatus(401);
    }
}