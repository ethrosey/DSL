// importing express
const express = require('express');

// create a web application as an instance of express()
const app = express();

// importing nedb
const Datastore = require('nedb');

// listen! the listen() function takes two arguments
// 1. a port on which to listen
// 2. a callback function i.e. what to do when a request arrives through this port
app.listen(3000, () => console.log('listening on 3000'));

// use the static function of the express library.
// the function takes a file or a directory as a parameter
app.use(express.static('public'));

// give the server the ability to received and parse json
// options are passed as argusments e.g. no json file bigger than 1mb
app.use(express.json({limit: '1mb'}));

// create an database to write to
const database = new Datastore('./data/database.db');
// load the database into memory. if it does not exist create the db.
database.loadDatabase();

// create a route to 'api" via the the POST method
// request has all the http request from the client
// response is the variable the server will send back to the client
app.post('/api', (request,response) => {
    // Console.log the request from the client to the server console to check
    console.log('I got a request!');

    const data = request.body
    // create a timestamp
    const timestamp = Date.now();
    // assign timestamp to data object
    data.timestamp = timestamp;
    // pushing data to the array
    database.insert(data);

    // complete the response
    response.json({
        status: 'success',
        timestamp: timestamp,
        mood: request.body.mood,
        latitude: request.body.lat,
        longitude: request.body.lon
    });
}); 