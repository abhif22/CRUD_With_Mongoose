const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('../../src/models/post');
const UserSchema  = new Schema({
    name: {
        type: String,
        required: [true, 'Name is Required'],
        validate: [
            (name)=> name.length > 2,
            'Name must be greater than 2 characters'
    ]
    },
    email: String,
    password: String,
    friends: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    posts: [PostSchema]
});
const User = mongoose.model('user', UserSchema);
module.exports = User;