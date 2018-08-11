const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/models/user');
var newUser;
describe('Testing User Model For Creating and Searching ', ()=>{
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

describe('Testing User Model for Deletion', ()=>{
    beforeEach((done)=>{
        newUser = new User({name: 'Abhishek Srivastava'});
        newUser.save()
            .then(()=>done());
    });
    it('Using Instance Based Method to Remove', (done)=>{
        newUser.remove()
            .then(()=> {
                User.findOne({name: 'Abhishek Srivastava'})
            })
            .then((result)=>{
                assert(result==null);
                done();
            })
            .catch((err)=>{
                console.log(err);
            });
    });
    it('Using Class based remove', (done)=>{
        User.remove({name: 'Abhishek Srivastava'})
            .then(()=>{
                User.findOne({name: 'Abhishek Srivastava'})
            })
            .then((result)=>{
                assert(result==null);
                done();
            });
    });
    it('Using Class based Removal using findOneAndRemove()', (done)=>{
        User.findOneAndRemove({name: 'Abhishek Srivastava'})
            .then(()=>{
                User.findOne({name: 'Abhishek Srivastava'})
            })
            .then((result)=>{
                assert(result==null);
                done();
            });
    });
    it('Using Class based Removal using findByIdAndRemove()', (done)=>{
        User.findByIdAndRemove({_id: newUser.id})
            .then(()=>{
                User.findOne({_id: newUser.id})
            })
            .then((result)=>{
                assert(result==null);
                done();
            });
    });
});