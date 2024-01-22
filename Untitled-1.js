const express = require ("express");
const { get } = require("node:http");
const https = require('node:https');
const app = express();

app.get("/", function (req, res){
    const city = "Astana"
    const api = "cd95ac91e2807ba92ed3db5d4c4c8621";
    const url = "https://openweathermap.org/city/1526273" +city + "&appid" + api + "&units=metric";
    https.get (url, function(response) {
        response.on("data", function(data){
            const weather = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const description = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageURL = "" + icon + "";
            res.write("<h1>Temperatue is " + temp + "C</h1>")
            res.write("<h>Description is " + description + "C</h2>")
            res.write("<img src" + imageURL + ">")
            res.send();



         
        })
    } )
})

app.listen(3000, function () {
    console.log("SErver is running on port 3000");
});


