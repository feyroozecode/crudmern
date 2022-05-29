const mongoose = require('mongoose')

const foodScheme = new mongoose.Schema({
    foodName:{
        type: String, 
        required: true
    }, 
    daysSinceIAte: {
        type: Number,
        required: true 
    },
});

const Food = mongoose.model("Food", foodScheme)
module.exports = Food