const express = require('express');
const morgan = require('morgan'); 
const path = require('path');
const cors = require('cors'); //cross origin resource sharing: helps to access server (localhost:808) from client(localhost:3000)
const bodyParser = require('body-parser') //to read throught the POST request
const routes = require('./Routes');

const app = express();
const PORT = process.env.PORT || 8080; //setting the port address for the localhost to run

//bodyParser helps to read the data from the requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//http request logger
app.use(morgan('tiny'));

//used to prevent the croos origin resource sharing error
app.use(cors({
    origin: '*'
}));

 //getting the route details from Routes.js file
app.use('/user',routes); //sends all the http request to routes

app.listen(PORT, async() =>{
    console.log(`Server is starting at ${PORT}`);
} );