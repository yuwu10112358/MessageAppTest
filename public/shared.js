'use strict';

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function () {
    const USEREVENT = {
        USER_LOGIN: "userLogin",
        USER_LOGIN_ACK: "userLoginAck",
        USER_LOGOUT: "userLogout",
        USER_TEST: "test"
    }

    const MESSAGEEVENT = {
        MESSAGE_SEND: "messageSend",
        MESSAGE_DELIVER: "messageDeliver",
        MESSAGE_RECEIVED: "messaageReceived",
        MESSAGE_READ: "messageRead",
        NEW_CONVERSATION: "newConv",
        LOAD_MESSAGES: "loadMessages"
    }

    return {
        USEREVENT: USEREVENT,
        MESSAGEEVENT: MESSAGEEVENT
    };

});