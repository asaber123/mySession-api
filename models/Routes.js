const mongoose =require('mongoose');

//This is the model for the mongoDb collection "Routes"
const RoutesSchema = mongoose.Schema({
    grade: String,
    name:String,
    location: String,
    typeOfRoute: String,
    user: String,
    date: {
        type: Date,
        default: Date.now
    }
})

//Export model to mongo atlas and the schema that should be used
module.exports = mongoose.model('Routes', RoutesSchema)