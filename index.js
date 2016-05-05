var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');
var app = express();
var Item = require('./item.js');

var items = [];

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    items.push(req.body);
    Item.create(req.body, function(err, item) {
        if (err || !item) {
            console.error("Could not create item");
            return;
        }
        console.log("Created favorite", item.name);
        res.status(201).json(items[items.length - 1]);
    });
});

exports.app = app;
exports.items = items;
