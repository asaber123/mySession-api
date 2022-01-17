const mongoose = require('mongoose');

//This is the model for the mongoDb collection "myTable"

const signupTemplate = new mongoose.Schema({
    fullName:{
        type: String,
        required: true, 
        min:2
    },
    userName:{
        type:String,
        required: true,
        min:6
    },
    password:{
        type:String,
        required: true,
        min:6

    },
    date:{
        type: Date,
        default: Date.now
    }
})

//Exporting the model, taking two argumnet, the name of the table and the name of the schema that has been created. 
module.exports = mongoose.model('myTable', signupTemplate)