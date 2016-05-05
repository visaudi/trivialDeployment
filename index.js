var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

var items = [];

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    items.push(req.body.items[0]);
    res.status(201).json(items[items.length - 1]);
});

exports.app = app;
exports.items = items;
