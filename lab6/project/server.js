const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser');
const PORT = 4000;

require("dotenv").config();
const jwt = require('jsonwebtoken');
require('crypto').randomBytes(64).toString('hex');

let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin:true, credentials:true }));

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

app.post("/tripEdit", async (req, res) => {
    let data = req.body;

    await tripEdit(data);
    res.send(data);
    console.log(data);
})

app.post("/trips/:id/:num", async (req, res) => {
    let data = req.params;
    await buyTrip(data);
    res.send(data);
    console.log(data);
})

app.delete("/trips/:id", async (req, res) => {
    console.log(req.params);
    deleteTrip(req.params.id);
})

app.get("/grades/:id", async (req, res) => {
    let data = await getGrade(req.params.id);;
    res.send(data);
    
})
app.post("/grades/:id/:grade", async (req, res) => {
    await addGrade(req.params);
    res.send(req.params);
})

app.post("/users/:login/:password/:type", async (req, res) => {
    console.log(req.params);
    await addUser(req.params);
    res.send(req.params);
})

app.post("/userCheck/:login/:password", async (req, res) => {
    let data = await checkUser(req.params);
    console.log(data);
    res.send(data);
})

app.post("/nicknameCheck/:login/", async (req, res) => {
    let data = await checkNickname(req.params);
    console.log(data);
    res.send(data);
})

app.post("/login/:login/:password", async(req, res)=>{
    console.log(process.env.JWT_KEY);
    let data = await getUserType(req.params);
    
    console.log(data[0].accountType);
    console.log(data[0]);

    const token = jwt.sign(
        { user_id: req.params.login,
        user_type: data[0].accountType,
        user_banned: data[0].banned},
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
    );
    console.log(token);
    res.status(200).json(token);
})

app.get("/users", async(req, res)=>{
    let data = await getUsers();
    res.send(data);
})

app.post("/type/:id/:type", async(req, res)=>{
    let data = await changeType(req.params);
    res.send(data);
})

app.post("/ban/:id/:ban", async(req, res)=>{
    let data = await changeBan(req.params);
    res.send(data);
})
app.post("/buy/:userId/:tripId/:howMany", async(req, res)=>{
    let data = await buyTrip(req.params);
    res.send(data);
})

app.get("/buy/:login", async (req, res) => {
    let data = await getBoughtTrips(req.params);
    res.send(data);
})

async function getTrips(){
    return new Promise((resolve, reject) =>{
        mysql.query('SELECT trips.*, IFNULL(AVG(grades.grade), 0 ) as grade FROM `trips` LEFT JOIN grades ON trips.id = grades.trip_id GROUP BY trips.id', (err, data) => {
            resolve(data)
        });
    })
}

async function addTrip(trip){
    console.log(typeof trip.picture);
    return new Promise((resolve, reject) =>{
        mysql.query(`INSERT INTO trips (name, place, startDate, endDate, price, maxParticipants, picture, description) 
        VALUES ('${trip.name}', '${trip.place}', '${trip.startDate.replace('T',' ').replace('Z', '')}', '${trip.endDate.replace('T',' ').replace('Z', '')}', ${trip.price}, ${trip.maxParticipants}, '${trip.picture}', '${trip.description}')`, 
        (err, data) => {
            console.log(err);
            resolve()
        });
    })
}

async function tripEdit(trip){
    return new Promise((resolve, reject) =>{
        mysql.query(`UPDATE trips SET name = '${trip.name}', place = '${trip.place}', startDate = '${trip.startDate.replace('T',' ').replace('Z', '')}', endDate = '${trip.endDate.replace('T',' ').replace('Z', '')}', price = ${trip.price}, maxParticipants = ${trip.maxParticipants}, picture = '${trip.picture}', description = '${trip.description}'
        WHERE id=${trip.id};`, 
        (err, data) => {
            console.log(err)
            console.log(data);
            resolve()
        });
    })
}

async function buyTrip(trip){
    return new Promise((resolve, reject) =>{
        mysql.query(`UPDATE trips SET maxParticipants=maxParticipants - ${trip.num} WHERE id=${trip.id};`, 
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

async function addGrade(trip){
    return new Promise((resolve, reject) =>{
        mysql.query(`INSERT INTO grades (trip_id, grade) VALUES (${trip.id}, ${trip.grade})`, 
        (err, data) => {
            resolve();
        });
    })
}

async function getGrade(tripId){
    console.log(tripId);
    return new Promise((resolve, reject) =>{
        mysql.query(`SELECT AVG(grade) AS grade FROM grades WHERE trip_id = ${tripId}`, 
        (err, data) => {
            console.log(data);
            resolve(data);
        });
    })
}

async function addUser(user){
    return new Promise((resolve, reject) =>{
        mysql.query(`INSERT INTO registered (nickname, password, accountType, banned) VALUES ('${user.login}', '${user.password}', '${user.type}', 0)`, 
        (err, data) => {
            console.log(data);
            resolve();
        });
    })
}

async function checkUser(user){
    console.log(user);
    return new Promise((resolve, reject) =>{
        mysql.query(`SELECT COUNT(1) AS isUser FROM registered WHERE nickname = '${user.login}' AND password = '${user.password}'`, 
        (err, data) => {
            //console.log(err);
            resolve(data);
        });
    })
}

async function checkNickname(user){
    console.log(user);
    return new Promise((resolve, reject) =>{
        mysql.query(`SELECT COUNT(1) AS isUser FROM registered WHERE nickname = '${user.login}'`, 
        (err, data) => {
            //console.log(err);
            resolve(data);
        });
    })
}


async function getUserType(user){
    console.log("parara" + user);
    return new Promise((resolve, reject) =>{
        mysql.query(`SELECT accountType, banned FROM registered WHERE nickname = '${user.login}' AND password = '${user.password}'`, 
        (err, data) => {
            //console.log(err);
            resolve(data);
        });
    });
}

async function getUsers(){
    return new Promise((resolve, reject) =>{
        mysql.query('SELECT * FROM `registered`', (err, data) => {
            resolve(data)
        });
    })
}

async function changeType(user){
    return new Promise((resolve, reject) =>{
        mysql.query(`UPDATE registered SET accountType = '${user.type}' WHERE ID = ${user.id}`, (err, data) => {
            resolve()
        });
    })
}

async function changeBan(user){
    return new Promise((resolve, reject) =>{
        mysql.query(`UPDATE registered SET banned = '${user.ban}' WHERE ID = ${user.id}`, (err, data) => {
            resolve()
        });
    })
}

async function buyTrip(tripBuy){
    console.log(tripBuy);
    return new Promise((resolve, reject) =>{
        mysql.query(`INSERT INTO boughtTrips (userId, tripId, howMany, boughtDate) VALUES ('${tripBuy.userId}', ${tripBuy.tripId}, ${tripBuy.howMany}, CURRENT_DATE())`, 
        (err, data) => {
            console.log(data);
            resolve();
        });
    })
}

async function getBoughtTrips(user){
    console.log(user.login);
    return new Promise((resolve, reject) =>{
        mysql.query(`SELECT * FROM boughtTrips WHERE userId = '${user.login}'`, 
        (err, data) => {
            console.log(data);
            resolve(data);
        });
    })
}

app.listen(PORT, function () {
    console.log("Backend API listening on port " + PORT)
})

