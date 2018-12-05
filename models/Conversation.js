'use strict';

const mongoose = require('mongoose');
const MONGO_CONNECTION_STR = 'mongodb://localhost/MessageAppTest';
const { User } = require('./User');
let db = mongoose.connect(MONGO_CONNECTION_STR);

const ConversationSchema = new mongoose.Schema({
    participants: [String],
    messages: [{
        time: Date,
        sender: String,
        txt: String
    }]    
})

// ------------------ static methods -------------------------------

ConversationSchema.statics.retrieveConversation = function(conversationID) {
    return Conversation.findOne({ _id: conversationID })
}

//this function creates a new Conversation document, stores it and return it
//Output is a thenable object returning the newly created conversation document upon resolving
ConversationSchema.statics.createConversation = function (participants, msg) {
    let newConversation = new Conversation({
        participants: participants,
        messages: [msg]
    })
    return newConversation.save().then((convDoc) => {
        for (let i in participants) {
            User.getUser(participants[i]).then((userDoc) => {
                userDoc.conversations.push(convDoc);
                userDoc.save();
            })
        }
        return convDoc;
    });
}

//this function stores a message in a given Conversation document, return nothing
ConversationSchema.statics.storeMessage = function (convID, msg) {
    return Conversation.retrieveConversation(convID).then((convData) => {
        convData.messages.push(msg);
        convData.save();
    })
}

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = {
    Conversation: Conversation
}