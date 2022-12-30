
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use(express.static('public'));

const port = process.env.PORT || 8080;
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:date', function (req, res, next) {
  const error = {"error": "Invalid Date"}
  const resValid = {"unix":"", "utc": ""}
  const reqDate = req.params.date
  let unixdate = parseInt(reqDate)
  let reqDate2 = new Date(reqDate)
  
  if(req.params.date == undefined){

  }

  function dateIsValid(date) {
    return date instanceof Date && !isNaN(date);
  }
  
  if(dateIsValid(new Date(reqDate))){
    resValid.utc = reqDate2.toUTCString();
    const unixTimestamp = reqDate2.valueOf()
    resValid.unix = unixTimestamp 
    res.json(resValid);
  }
   else if(dateIsValid(new Date(reqDate * 1000))){
    resValid.utc = new Date(unixdate).toUTCString(); 
    resValid.unix = Math.floor(reqDate.valueOf()) 
    res.json(resValid)
   }else{
    res.json(error)}
   
    //const teste = {"unix":unixTimestamp, "utc": new Date(reqDate)}
//     const testeDate = new Date(reqDate) 
// console.log(testeDate.valueOf())
//   console.log(req.body)

  
})

app.get('/api/', function (req, res, next) {
  const dateNow = new Date()
  res.send({"unix": dateNow.valueOf(), "utc": dateNow.toUTCString()})
})

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
