const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const expressHBS = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3030;
app.engine('.hbs', expressHBS({defaultLayout:'layout', extname: '.hbs'}));
app.set('view engine', 'hbs')
app.set(port);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.listen((err)=>{
    if(err)
        console.log(err);
    else  
        console.log(`Server up and running at ${port}`);
});