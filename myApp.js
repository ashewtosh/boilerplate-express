require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

console.log("Hello World");
app.use((req, res, next) => {
    let meth = req.method;
    let reqPath = req.path;
    let reqIP = req.ip;
    console.log(`${meth} ${reqPath} - ${reqIP}`);
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/",function(req, res) {
    absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
});

app.use('/public' ,express.static(__dirname + "/public"));

app.get('/json', function(req, res) {
    if (process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({'message': 'HELLO JSON'});
    } else {
        res.json({"message": "Hello json"});
    }
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({time: req.time});
});

app.get('/:word/echo', function(req, res) {
    let word = req.params.word;
    res.json({echo: word});
});


// app.route('/name').get(function(req, res){
//     let firstName = req.query.first;
//     let lastName = req.query.last;

//     res.json({name: `${firstName} ${lastName}`})
// })
app.route('/name').post(function(req, res) {
    let first = req.body.first;
    let last = req.body.last;
    res.json({name: `${first} ${last}`});
})


































 module.exports = app;
