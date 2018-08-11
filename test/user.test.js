const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/models/user');
var newUser;
describe('Testing User Model', ()=>{
    before((done)=>{
        mongoose.connection.collections.users.drop(()=>{
            done();
        });
    });
    it('Create a New User', (done)=>{
        newUser = new User({name: 'Abhishek Srivastava'});
        newUser.save()
                .then(()=>{
                    assert(!newUser.isNew);
                    done();
                });
    });
    it('Finds all Existing Users', (done)=>{
        User.find({name: 'Abhishek Srivastava'})
            .then((users)=>{
                assert(newUser.id.toString()===users[0]._id.toString());
                done();
            })
    })
});