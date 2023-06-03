const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser');
const PORT = 4000;

let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let mysql = require('./db.js');

app.get("/trips", async (req, res) => {
    let data = await getTrips();
    res.send(data);
})

app.post("/trips", async (req, res) => {
    let data = req.body;

    await addTrip(data);
    res.send(data);
    console.log(data);
})

app.delete("/trips/:id", async (req, res) => {
    console.log(req.params);
    deleteTrip(req.params.id);
})

async function getTrips(){
    return new Promise((resolve, reject) =>{
        mysql.query('SELECT * FROM trips', (err, data) => {
            resolve(data)
        });
    })
}

async function addTrip(trip){
    console.log(typeof trip.picture);
    return new Promise((resolve, reject) =>{
        mysql.query(`INSERT INTO trips (name, place, startDate, endDate, price, maxParticipants, picture, description) VALUES ('${trip.name}', '${trip.place}', '${trip.startDate.replace('T',' ').replace('Z', '')}', '${trip.endDate.replace('T',' ').replace('Z', '')}', ${trip.price}, ${trip.maxParticipants}, '${trip.picture}', '${trip.description}')`, 
        (err, data) => {
            console.log(err);
            resolve()
        });
    })
}

async function deleteTrip(trip){
    return new Promise((resolve, reject) =>{
        mysql.query("DELETE FROM `trips` WHERE id = " + trip, 
        (err, data) => {
            resolve()
        });
    })
}

app.listen(PORT, function () {
    console.log("Backend API listening on port " + PORT)
})

