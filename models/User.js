'use strict';

const mongoose = require('mongoose');
const MONGO_CONNECTION_STR = 'mongodb://localhost/MessageAppTest';

let ObjectID = mongoose.Schema.Types.ObjectId;
const UserSchema = new mongoose.Schema({
    username: String,
    conversations: [ObjectID]
})

UserSchema.statics.getUser = function (username) {
    let db = mongoose.connect(MONGO_CONNECTION_STR);
    let getOrAddUser = function (doc) {
        if (doc == null) {
            let newDoc = new User({
                'username': username
            });
            return newDoc.save().then((doc) => {
                console.log('inserted username ' + username);
                return doc;
            });
        }
        else {
            return doc;
        }
    };
    return db.then(() => {
        return User.findOne({ 'username': username })
            .then(getOrAddUser);
    }, (err) => {
        console.log(err);
    });
}

const User = mongoose.model('User', UserSchema);
module.exports = {
    User : User
}