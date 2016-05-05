var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var should = chai.should();

mongoose.connect('mongodb://localhost/items');
var Item = require('./item.js');
var app = require('./index.js').app;
var items = require('./index.js').items;
chai.use(chaiHttp);
describe('a minimum of work', function() {

    describe('a little HTTP', function() {

        it('should add an item on POST', function(done) {
            chai.request(app)
                .post('/items')
                .send({'name': 'Kale'})
                .end(function(err, res) {
                    should.equal(err, null);
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.name.should.be.a('string');
                    res.body.name.should.equal('Kale');
                    done();
                });
        });

    });

    beforeEach(function(done) {
        mongoose.connection.db.dropDatabase();
        var broccoli = {
            name: 'broccoli',
        };


        chai.request(app)
            .post('/items')
            .send(broccoli)
            .end(done);


    });

    describe('barely a database', function() {

        it('should have the same item in the db that we sent over the post', function(done) {
            Item.findOne({name: "broccoli"}, function(err, item) {
                item.name.should.equal("broccoli");
                done();
            });
        });
    });

});
