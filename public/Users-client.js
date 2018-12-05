'use strict';
// JQuery for handling user related stuff
var channel = channel || io('http://localhost:3000');
$(function () {
    let getCurrentUsername = function () {
        return $("h1[username]").attr("username"); 
    }
    channel.on('connect', () => {
        let username = getCurrentUsername();
        channel.emit("userLogin", username);
    });
    let chatLog = $('#chatLog');

    //socket event handling

    //page event handling

});