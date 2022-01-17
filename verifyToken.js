const jwt = require('jsonwebtoken');


//Creating a middlewere funciton that can be added to any routes that I want to have protected or private. 
//The token is then only valid if the user is logged in. 
module.exports= function (req,res,next){
    console.log("verifying token")
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, claims) => {
            if (err) {
                console.log(`Error ${err}`)
                return res.sendStatus(403);
            }
            req.userName = claims.userName;
            next();
        });
    } else {
        console.log("No token")
        res.sendStatus(401);
    }
}