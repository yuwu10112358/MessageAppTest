'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module) }
// JQuery for handling user related stuff
define(['jquery', './common'], function ($, Common) {
    let channel = Common.getChannel();
    $(function () {
        let getCurrentUsername = function () {
            return $("h1[username]").attr("username");
        }
        channel.on('connect', () => {
            let username = getCurrentUsername();
            channel.emit("userLogin", username);
        });

        //socket event handling

        //page event handling

    });
    return true;
});