'use strict';
const { USEREVENT } = require('./../public/shared');
const { User } = require('./../models/User');
const { Conversation } = require('../models/Conversation');
const mongoose = require('mongoose');
const MONGO_CONNECTION_STR = 'mongodb://localhost/MessageAppTest';

//global list of online users
// each element has the following properties:
/*
 * username: string
 * id: string -> this is the id of the socket associated with the user
 * 
 */
let ONLINE_USERS = [];

class UserServerSide {

    static addOnlineUser(username, socketID) {
        ONLINE_USERS.push(Object.freeze({ 'username': username, 'id': socketID }));
    }

    static removeDisconnectedUser(socketID) {
        for (let i in ONLINE_USERS) {
            if (ONLINE_USERS[i].id == socketID) {
                let username = ONLINE_USERS[i].username;
                ONLINE_USERS.splice(i, 1);
                return username;
            }
        }
    }

    static getUserFromSocket(socketID) {
        for (let i in ONLINE_USERS) {
            if (ONLINE_USERS[i].id == socketID) {
                return ONLINE_USERS[i].username;
            }
        }
        return null;
    }

    static getSocketFromUsername(username) {
        for (let i in ONLINE_USERS) {
            if (ONLINE_USERS[i].username == username) {
                return ONLINE_USERS[i].id;
            }
        }
        return null;
    }
}

module.exports = {
    UserServerSide: UserServerSide,
}