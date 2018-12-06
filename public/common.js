'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module) }
// JQuery for handling user related stuff
define(['socketio'], function (io) {
    let channel = io('http://localhost:3000');
    let getChannel = function () {
        return channel;
    }
    return {
        getChannel: getChannel
    };
});