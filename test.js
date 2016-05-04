var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();

it('should add an item on POST', function(done) {
    chai.request(app)
        .post('/items')
        .send({'name': 'Kale'})
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('id');
            res.body.name.should.be.a('string');
            res.body.id.should.be.a('number');
            res.body.name.should.equal('Kale');
            storage.items.should.be.a('array');
            storage.items.should.have.length(1);
            storage.items[0].should.be.a('object');
            storage.items[0].should.have.property('id');
            storage.items[0].should.have.property('name');
            storage.items[0].id.should.be.a('number');
            storage.items[0].name.should.be.a('string');
            storage.items[0].name.should.equal('Kale');
            done();
        });
});
