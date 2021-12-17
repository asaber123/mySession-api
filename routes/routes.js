const express = require('express');
const router = express.router();

//Routes
app.get('/', (req, res) =>{
    res.send('We are on routes');
})

module.exports = router;
