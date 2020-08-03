const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",(req,res)=>{
    
    var cityName = req.body.cityName;
    const endPoint = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+",bd&appid=48cfce5981ea65a0395f806f0b801534&units=metric";
    var icon ;
    https.get(endPoint,(response)=>{
        response.on("data",(data)=>{
            //parse the hexdata into json format
            const weatherData = JSON.parse(data);
            icon = weatherData.weather[0].icon;
            const baseURL = "http://openweathermap.org/img/wn/"+icon+ "@2x.png";
            console.log(icon)
            console.log(weatherData);
            res.send("<h2>The weather in " + weatherData.name+" is "+ weatherData.main.temp+ "</h2>");
        })
    });
});

app.listen(3000,()=>{
    console.log("The server is running on port http://localhost:3000");
});