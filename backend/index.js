const express = require("express");
const rootRouter = require("./routes/index");
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/api/v1", rootRouter);

app.get("/", function(req, res){
    res.send("alright");
})

app.listen(3000, function(){
    console.log("Server started at : http://localhost:3000/")
});
