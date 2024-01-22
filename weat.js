const express = require('express') 
const https = require('node:https') 
const bodyParser = require('body-parser'); 
 
const app = express() 
app.use(bodyParser.urlencoded({ extended: true })); 
 
const api = "9ae7477dfe8a96f589962f0a3ff56a96" 
 
app.get("/", (req, res)=>{ 
    // Send the HTML form to the client 
    res.sendFile(__dirname + '/index.html'); 
});

app.post("/", (req, res)=>{ 
    const city = req.body.city; 
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api + "&units=metric" ; 
    https.get(url, (response)=>{ 
        response.on("data", (data)=>{ 
            const weatherData = JSON.parse(data) 
            const temp = weatherData.main.temp; 
            const description = weatherData.weather[0].description; 
            const icon = weatherData.weather[0].icon; 
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            console.log(weatherData); 
            res.write("<h1>Temperature is "+ temp + "<h1>") 
            res.write("<h2>Weather is "+ description + "<h1>") 
            res.write("<img src="+ imageURL +">") 
            res.send() 
        }) 
    }) 
}); 
 
app.listen(3000, ()=>{ 
    console.log("Server is running on 3000"); 
})