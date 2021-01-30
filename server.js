const express = require('express');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload')
const expressSession = require('express-session');
require('dotenv').config({
    path: './config/.env'
});
require('./config/db');
const app = express();


//views------------------------------------------------------------------------------------------------------------------------------------
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(fileupload())
//save cookies---------------------------------------
const mongoStore = MongoStore(expressSession)
app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))
// Handlebars--------------------------------------------
const Handlebars = require("handlebars"),
    {
        allowInsecurePrototypeAccess
    } = require('@handlebars/allow-prototype-access');

const exphbs = require("express-handlebars");

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'hbs')

app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    next()
})
app.use(express.static(__dirname + "/public"))


//controllers------------------------------------------------------------------------------------------------------------------------------
//utilisateur-----------
const userconnect = require('./controllers/user/connexion'); //post
const userCreate = require('./controllers/user/inscription'); //post
const deconnect = require('./controllers/User/deconnexion'); //post


//admin-------------------
const articleModel = require('./models/articleModel');//post


//route------------------------------------------------------------------------------------------------------------------------------------

//home--------------------------------------------

app.get('/', (req, res) => {
    res.render('home')
})



//connexion----------------------------------------
app.post('/connexion/auth', userconnect) //post connexion
    .get('/deconnect', deconnect) //deconnexion



//inscription--------------------------------------
app.get('/inscription', (req, res) => {
        res.render('./pages/inscription')
    }) //visuel inscription

    .post('/inscription/post', userCreate) //post create user



//admin--------------------------------------------
app.get('/admin', (req,res) =>{
    res.render('./pages/article')
})
app.post('/admin/article', articleModel )

















//---------------------------------------------------------------------------------------------------
app.listen(process.env.PORT, () => {
    console.log(`server connect to ${process.env.PORT}`);
})