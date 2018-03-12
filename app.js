const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//DATABASE
const server = 'localhost:27017';
const database = 'todofancy';
mongoose.connect(`mongodb://${server}/${database}`)
.then(()=>console.log(`Database connection successful.`))
.catch((err)=>console.log(`Database connection error => ${err}`));
//BODYPARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//ROUTES
app.use('/todo',require('./routes/todo'));
app.use('/users',require('./routes/users'));
//PORT
app.listen(process.env.PORT || 3000);