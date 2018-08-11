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

describe('Testing User Model Updation', ()=>{
    beforeEach('First Inserting Records for updation', (done)=>{
        newUser = new User({name: 'Abhishek Srivastava'});
        newUser.save()
            .then(()=> done());
    }); 
    it('Using Instance Based Method \'Set and Update\' ', (done)=>{
        newUser.set('name', 'Surbhi Srivastava');
        newUser.save()
            .then(()=>{
                return User.findOne({name: 'Surbhi Srivastava'})
            })
            .then((result)=>{
                // console.log(`Result: ${result}`);
                assert(result!=null);
                assert(result.name.toString()==='Surbhi Srivastava');
                done();
            })
            .catch((err)=> console.log(err));
    });
    it('Using Instance based Update()', (done)=>{
        newUser.update({name: 'Mansi Srivastava'}, {new: true})
            .then((data)=>{
                return User.findOne({name: 'Mansi Srivastava'})
            })
            .then((result)=>{
                assert(result!=null);
                assert(result.name.toString()==='Mansi Srivastava');
                done();
            });
    });
    it('Using Class Based update()', (done)=>{
        User.update({name: 'Abhishek Srivastava'}, {name: 'Sudha Srivastava'}, {new: true})
            .then(()=>{
                return User.findOne({name: 'Sudha Srivastava'})
            })
            .then((result)=>{
                assert(result!=null);
                assert(result.name.toString()==='Sudha Srivastava');
                done();
            });
    });
    it('Using Class Based findOneAndUpdate()', (done)=>{
        User.findOneAndUpdate({name: 'Abhishek Srivastava'}, {name: 'Manoj Srivastava'}, {new: true})
            .then(()=>{
                return User.findOne({name: 'Manoj Srivastava'})
            })
            .then((result)=>{
                assert(result!=null);
                assert(result.name.toString()==='Manoj Srivastava');
                done();
            });
    });
    it('Using Class Based findByIdAndUpdate()', (done)=>{
        User.findByIdAndUpdate({_id: newUser.id}, {name: 'Srivastava'}, {new: true})
            .then(()=>{
                return User.findOne({_id: newUser.id})
            })
            .then((result)=>{
                assert(result!=null);
                assert(result.name.toString()==='Srivastava');
                done();
            });
    });
});