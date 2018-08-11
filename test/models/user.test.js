const assert = require('assert');
const User = require('../../src/models/user');
describe('Testing User Model', ()=>{
    it('Create a New User', ()=>{
        let newUser = new User({name: 'Abhishek Srivastava'});
        newUser.save();
    });
});