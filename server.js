import { coinFlips, countFlips, coinFlip, flipACoin } from "./modules/coin.mjs";
import minimist from 'minimist'; // parses argument options
import express from 'express'; // minimal & flexible Node.js web application framework

// Require Express.js
// const express = require('express')
// Strange, this above line is in the instruction, but I need to delete it
// Maybe ask later in the office hour
const app = express()

var argument = minimist(process.argv.slice(2))
var name = 'port'
const HTTP_PORT = argument[name] || 5000

// Create my server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// Check status code endpoint
app.get('/app/', (req, res) => {
    res.statusCode = 200;
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

app.get('/app/flip/call/heads', (req, res) => {
    res.statusCode = 200;
    let answer = flipACoin('heads')
    res.send(answer)
    res.writeHead(res.statusCode, {'Content-Type': 'text/plain'});
})

app.get('/app/flip/call/tails', (req, res) => {
    res.statusCode = 200;
    let answer = flipACoin('tails')
    res.send(answer)
    res.writeHead(res.statusCode, {'Content-Type': 'text/plain'});
})

// If not recognized request (other requests)
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});