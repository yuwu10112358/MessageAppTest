'use strict';

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

module.exports = {
    USEREVENT: USEREVENT,
    MESSAGEEVENT: MESSAGEEVENT
};