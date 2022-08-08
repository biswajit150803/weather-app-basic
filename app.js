const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  
  const query=req.body.cityName;
  const appid="b9f9b986c8046b5cf7123e8cb11b7656";

  https.get(
    "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid,
    function (response) {
      console.log(response.statusCode);
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        console.log(weatherData.main.temp);
        res.write(
          "<h1>The temperature is " + weatherData.main.temp + " kelvin</h1>"
        );
        res.write(
          "The weather description is " + weatherData.weather[0].description
        );
        const icon = weatherData.weather[0].icon;
        const imageURL =
          "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<img src=" + imageURL + ">");
        res.send();
      });
    }
  );

});
app.listen(3000, function () {
  console.log("My server is running on port 3000");
});

