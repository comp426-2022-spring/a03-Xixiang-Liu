import { coinFlips, countFlips, coinFlip, flipACoin } from "./modules/coin.mjs";
import minimist from 'minimist'; // parses argument options
import express from 'express'; // minimal & flexible Node.js web application framework

// Require Express.js
const express = require('express')
const app = express()

var argument = minimist(process.argv.slice(2))
var name = 'port'
const HTTP_PORT = argument[name] || 5000

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// Check status code endpoint
app.get('/app/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain'});
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

// Endpoint returning JSON of flip function result
app.get('/app/flip/', (req, res) => {
    res.statusCode = 200;
    let aFlip = coinFlip()
    res.json({flip: aFlip})
    res.writeHead(res.statusCode, {'Content-Type' : 'application/json'});
})

// Endpoint returning JSON of flip array & summary
app.get('/app/flips/:number', (req, res) => {
    var flips = coinFlips(req.params.number)
    res.status(200).json({"raw" : flips, "summary" : countFlips(flips)})
});

// Endpoint that returns result of calling heads
app.get('/app/flip/call/heads', (req, res) => {
    res.statusCode = 200;
    let answer = flipACoin('heads')
    res.send(answer)
    res.writeHead(res.statusCode, {'Content-Type': 'text/plain'});
})

//Endpoint that returns the result of calling tails
app.get('/app/flip/call/tails', (req, res) => {
    res.statusCode = 200;
    let answer = flipACoin('tails')
    res.send(answer)
    res.writeHead(res.statusCode, {'Content-Type': 'text/plain'});
})

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});