const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema  = new Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    email: String,
    password: String,
    friends: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }]
});
const User = mongoose.model('user', UserSchema);
module.exports = User;