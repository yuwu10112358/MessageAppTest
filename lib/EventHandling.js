'use strict';

const { USEREVENT, MESSAGEEVENT } = require('../public/shared');
const { User } = require('../models/User');
const { Conversation } = require('../models/Conversation');
const { MessageServerSide } = require('./Messages-Server');
const { UserServerSide } = require('./User-Server');

// User related event handling
let registerUserServerEvents = function (server, socket) {
    socket.on(USEREVENT.USER_LOGIN, (username) => {
        console.log('user ' + username + ' has joined, sending ack');
        UserServerSide.addOnlineUser(username, socket.id);
        // create entry in database if not already there
        User.getUser(username).then((userData) => {
            for (let i = 0; i < userData.conversations.length; i++) {
                MessageServerSide.deliverConversation(socket, userData.conversations[i]);
            }
        });
        socket.emit('test', 'hihihi');
    })

    socket.on('test', (msg) => {console.log(msg)});

    socket.on('disconnect', () => {
        let username = UserServerSide.removeDisconnectedUser(socket.id);
        console.log('user ' + username + ' has left');
        server.emit(USEREVENT.USER_LOGOUT, username);
    })

};

let registerMessageServerEvents = function (server, socket) {
    socket.on(MESSAGEEVENT.NEW_CONVERSATION, (message) => {
        let participants = message.participants;
        let msg = {
            time: message.time,
            sender: message.sender,
            txt: message.txt
        }
        Conversation.createConversation(participants, msg).then((doc) => {
            msg.convID = doc._id;
            msg.participants = participants;
            MessageServerSide.deliverMessage(server, participants, msg);
        })
    });

    socket.on(MESSAGEEVENT.MESSAGE_SEND, (msg) => {
        MessageServerSide.deliverMessage(server, msg.participants, msg);
        Conversation.storeMessage(msg.convID, msg);
    });
};

module.exports = {
    registerUserServerEvents: registerUserServerEvents,
    registerMessageServerEvents: registerMessageServerEvents
}