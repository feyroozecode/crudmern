const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const FoodModel = require('./models/Food')
const path = require('path')
const bodyPArser = require('body-parser')
require("dotenv").config()

const app = express()

const DB_URL = "mongodb+srv://alfajer:Ibr.alfajer.9946@crudfood.tjxf8.mongodb.net/foods?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3033

app.use(express.static(path.resolve(__dirname, "./client/build")))
app.use(cors())

mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, 
    (err) => {
        if(err) console.log()
        else console.log("Mongodb is connected");
    }
)

app.use(bodyPArser.urlencoded({extended: true}))
app.use(bodyPArser.json())

app.post('/insert', async(req, res)=>{

    const foodName = req.body.foodName
    const days = req.body.days

    const food = new FoodModel({foodName: foodName, daysSinceIAte: days})
    
    try {
        await food.save()
        res.send('inserted data')
    } catch (error) {
        console.log(error);
    }
})

app.get("", function(request, response){
    //response.sendFile(path.resolve(__dirname, "./client/build/index", "index.html"))
  response.send('Work')  
})

app.get('/read', async(req, res)=>{
    FoodModel.find({}, (err, result) =>{
        if(err){
            res.send(err)
        }

        res.send(result)
    })
})

// update food
app.put('/update', async(req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try{
        await FoodModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = newFoodName,
            updatedFood.save();
            res.send('Update sucessfully') 
        })
    } catch(err){
        console.log(err);
    }
})

app.delete('/delete/:id', async(req, res)=>{
    const id = req.params.id;

    await FoodModel.findByIdAndRemove(id).exec();
    res.send("deleted")
})

app.listen(PORT, ()=>{
    console.log('Server is running on PORT '+ PORT +' ! Alhamdoulillah');
})