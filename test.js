var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();

var app = require('./index.js').app;
var items = require('./index.js').items;
chai.use(chaiHttp);

it('should add an item on POST', function(done) {
    chai.request(app)
        .post('/items')
        .send({'items': ['Kale']})
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('string');
            res.body.should..equal('Kale');
            items.should.be.a('array');
            items.should.have.length(1);
            items[0].should.be.a('string');
            done();
        });
});
