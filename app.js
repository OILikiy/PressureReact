var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var axios = require('axios')

var date = []
var pressure = []
var count = 0
var date1 = []
//var currentime = 0

app.use(express.static("static/dist"))
app.use(bodyParser.json())

app.get('/api/v1/atmosphere', function (req, res, next) {
    // var first = []
    // var second = []
    // for (var i = 0; i < 10; i++) {
    //     first.push(Math.random() * 100)
    //     second.push(Math.random() * 100)
    // }
    // res.json({"date": first, "pressure": second})
    var API_KEY = "25e992dfbb2547898737c04f77a840d5"
    axios.get("http://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=" + API_KEY)
    .then(function (response) {
        // console.log(response.data)
        pressure.push(response.data.main.pressure)
        //currentime = Date.now()
        //console.log(currentime)
        date.push(Date(response.data.dt))
        //date.push(new Date(response.data.dt*1000).toISOString())
        //console.log(date)
        //console.log(response.data)
        date1.push(new Date().getTime())
        //console.log(date1)
        // count++
        //res.json({"date": date, "pressure": pressure})
        res.json({"date": date, "pressure": pressure})
    })
})

app.post('/api/v1/atmosphere', function (req, res, next) {
    //
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
