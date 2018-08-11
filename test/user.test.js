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
                })
                .catch((err)=>{
                    cosnole.log(err);
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

    before((done)=>{
        mongoose.connection.collections.users.drop(()=>{
            done();
        });
    });

    beforeEach((done)=>{
        newUser = new User({name: 'Abhishek Srivastava'});
        newUser.save()
            .then(()=>done());
    });
    it('Using Instance Based Method to Remove', (done)=>{
        newUser.remove()
            .then(()=> {
                return User.findOne({name: 'Abhishek Srivastava'})
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
                return User.findOne({name: 'Abhishek Srivastava'})
            })
            .then((result)=>{
                assert(result==null);
                done();
            });
    });
    it('Using Class based Removal using findOneAndRemove()', (done)=>{
        User.findOneAndRemove({name: 'Abhishek Srivastava'})
            .then(()=>{
                return User.findOne({name: 'Abhishek Srivastava'})
            })
            .then((result)=>{
                assert(result==null);
                done();
            });
    });
    it('Using Class based Removal using findByIdAndRemove()', (done)=>{
        User.findByIdAndRemove({_id: newUser.id})
            .then(()=>{
                return User.findOne({_id: newUser.id})
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

describe('Schema Validations', ()=>{
    it('Testing if Required Field Values are Missing', (done)=>{
        newUser = new User({name: undefined});
        let validationRes = newUser.validateSync();
        assert(validationRes.errors.name.message === 'Name is Required');
        done();
    });
    it('Testing if Name is greater than 2 characters', (done)=>{
        newUser = new User({name: 'Abhishek'});
        let validationRes = newUser.validateSync();
        console.log(validationRes);
        assert(validationRes.errors.name.message != 'Name must be greater than 2 characters');
        done();
    });
});

describe('Subdocuments Test', ()=>{
    it('Creating User with some subDocuments', (done)=>{
        newUser = new User({
            name: 'Rockstar',
            posts:[
                {title: 'Kun Faya Kun Faya...'},
                {title: 'Tum ho saath mere...'},
                {title: 'Jo bhi mai kehna ...'}
            ]
        });
        newUser.save()
            .then(()=>User.findOne({name: 'Rockstar'}))
            .then((result)=>{
                assert(result!=null);
                done();
            })
            .catch((err)=>console.log(err));
    });
    it('Adding Subdocuments to existing User', (done)=>{
        User.findOne({name: 'Manoj Srivastava'})
            .then((result)=>{
                assert(result!=null);
                let len = result.posts.length;  
                result.posts.push({title: 'O mere dil ke chain...'});
                result.save()
                    .then(()=> User.findOne({name: 'Manoj Srivastava'}))
                    .then((user)=>{
                        assert(user.posts.length==len+1);
                        done();
                    });
            });
    });
    it('Removing Subdocuments from an Existing User', (done)=>{
        User.findOne({name: 'Rockstar'})
            .then((result)=>{
                len = result.posts.length;
                //We Won't have to this for loop part
                //We will generally get _id from front end
                let post_id = '5b6f2896c0034962c1a31918'
                for(let i=0;i<result.posts.length;i++){
                    if(result.posts[i].title=='Jo bhi mai kehna ...')
                        post_id=result.posts[i]._id;
                }
                console.log(`Deleting Post_id: ${post_id}`);
                result.posts.id(post_id).remove();
                // result.update({$pull: {posts: {_id: post_id}}});
                return result.save();
            })
            .then(()=>User.findOne({name: 'Rockstar'}))
            .then((user)=>{
                assert(user.posts.length==len-1);
                done();
            })
            .catch((err)=>console.log(err));
    });
    it('Updating Content Inside Subdocuments of an Existing User', (done)=>{
        var post_id = '5b6f2896c0034962c1a31918'
        User.findOne({name: 'Rockstar'})
            .then((result)=>{
                len = result.posts.length;
                //We Won't have to this for loop part
                //We will generally get _id from front end
                for(let i=0;i<result.posts.length;i++){
                    if(result.posts[i].title=='Kun Faya Kun Faya...')
                        post_id=result.posts[i]._id;
                }
                console.log(`Updating Post_id: ${post_id}`);
                result.posts.id(post_id).title='Kaho na pyaar hai ...';
                return result.save();
            })
            .then(()=>User.findOne({name: 'Rockstar'}))
            .then((user)=>{
                assert(user.posts.id(post_id).title=='Kaho na pyaar hai ...');
                done();
            })
            .catch((err)=>console.log(err));
    });

    it('Remove All Subdocuments from an Existing User', (done)=>{
        User.findOneAndUpdate({name: 'Rockstar'},{posts: []},{upsert: true})
            .then(()=>User.findOne({name: 'Rockstar'}))
            .then((user)=>{
                assert(user.posts.length==0);
                done();
            })
            .catch((err)=>console.log(err));
    });
});