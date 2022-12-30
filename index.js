
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


app.post('/api/:date', function (req, res, next) {
  const error = {"error": "Invalid Date"}
  const resValid = {"date": ""}
  const reqDate = req.params.date
   
  function dateIsValid(date) {
    return date instanceof Date && !isNaN(date);
  }
  
  if(dateIsValid(new Date(reqDate))){resValid.date = reqDate; res.json(resValid)}
   else if(dateIsValid(new Date(reqDate * 1000))){
    resValid.date = new Date(reqDate * 1000); res.json(resValid)
   }else{
    res.json(error)}
   

  console.log(req.body)

  
})



// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
