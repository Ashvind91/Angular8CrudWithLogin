var express = require('express');
var app = express();
var db = require('./models/db');
var bodyParser = require('body-parser')
var VerifyToken = require('./auth/VerifyToken');

var commonController = require('./controllers/commonController');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser);
app.use(urlencodedParser);

let response = {
    status: 200,
    data: [],
    token: '',
    message: null
};

// Error handling
const sendError = (err, res) => {
    response.status = 500;
    response.data = [],
    response.token = '',
    response.message = typeof err == 'object' && err != null ? err.message : err;
    res.status(500).json(response);
};

const sendSuccessResponse = (data, msg, res) => {
    response.status = 200;
    response.data = data,
    response.token = '',
    response.message = msg,
    res.status(200).json(response);
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.set('view engine', 'ejs');
app.use(express.static('./dist'));

app.use(express.static('./local'));

commonController(app, sendSuccessResponse, sendError,urlencodedParser, jsonParser,VerifyToken);


app.listen(3000);
