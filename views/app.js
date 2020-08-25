var express = require('express');
var bodyParser = require('body-parser');    
var bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
var app = express();
const PORT = process.env.PORT || 5000;
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 
const users = [];

app.use('/', express.static('assets'));
//passport config
require('./config/passport')(passport);
//DB config
const db = require('./config/keys').MongoURI;
//connect to mongo
mongoose.connect(db, {useNewUrlParser:true})
    .then( () => console.log('mongodb connected...'))
    .catch(err=>console.log(err))
//ejsu
app.set('view engine', 'ejs');
//bodyparser
app.use(express.urlencoded({extended:false}));
//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());
//global vars
app.use((req, res, next) => {
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
//routes
app.use('/', require('./routes/index'));

app.listen(PORT, console.log('server started on port ${PORT}'));