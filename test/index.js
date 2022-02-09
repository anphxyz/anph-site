//During the test the env variable is set to test
process.env.NODE_ENV = 'TEST';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Pets', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    // describe('/GET users', () => {
    //     it('it should GET all the users', (done) => {
    //         chai.request(server)
    //             .get('/users')
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('array');
    //                 res.body.length.should.be.eql(9); // fixme :)
    //                 done();
    //             });
    //     });
    // });

    describe('/POST register', () => {

        it('it should RETURN invalid data', (done) => {
            let user = {
            };
            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Invalid data!');
                    done();
                });
        });

        it('it should RETURN invalid phone', (done) => {
            const user = {
                email: "aanltll2992@gmail.com",
                password: "123456",
                confirmPassword: "12326",
                phoneNumber: "091234567"
            };
            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Password is invalid');
                    done();
                });
        });

        it('it should RETURN invalid phone', (done) => {
            const user = {
                email: "aanltll2992@gmail.com",
                password: "123456",
                confirmPassword: "123456",
                phoneNumber: "091234567"
            };
            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Phone number is invalid');
                    done();
                });
        });

        it('it should RETURN invalid email', (done) => {
            const user = {
                email: "aanltlmail.com",
                password: "123456",
                confirmPassword: "123456",
                phoneNumber: "0912345679"
            };
            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Email is invalid');
                    done();
                });
        });



        // it('it should RETURN success registration', (done) => {
        //     let user = {
        //         email: "aanltll2992@gmail.com",
        //         password: "123456",
        //         confirmPassword: "123456",
        //         phoneNumber: "0912345678"
        //     };
        //     chai.request(server)
        //         .post('/register')
        //         .send(user)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             res.body.should.have.property('message').eql('Register success');
        //             done();
        //         });
        // });

        it('it should RETURN email existed', (done) => {
            let user = {
                email: "aanltll2992@gmail.com",
                password: "123456",
                confirmPassword: "123456",
                phoneNumber: "0912345678"
            };
            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Email is existed');
                    done();
                });
        });

    });
});