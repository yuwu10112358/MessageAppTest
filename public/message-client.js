'use strict';
if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(['jquery', './shared', './common'], function ($, Shared, Common) {
    let MESSAGEEVENT = Shared.MESSAGEEVENT;
    let channel = Common.getChannel();
    // messages related handling

    $(function () {
        let conversationData = {};

        let getCurrentUsername = function () {
            return $("h1[username]").attr("username");
        }

        $('#btnSend').click(() => {
            let messageTxt = $("#txtBar").val();
            let now = new Date();
            let username = getCurrentUsername();
            let target = $("#recipient").val().split(',');
            target.unshift(username);
            if ($('#chatLogTitle').attr('convid') == null || $("#recipient").val() != $("#recipient").attr('default')) {
                // newly initiated conversation
                channel.emit(MESSAGEEVENT.NEW_CONVERSATION, {
                    'time': now,
                    'sender': username,
                    'txt': messageTxt,
                    'participants': target
                });
            }
            else {
                // extending existing conversation
                let convID = $('#chatLogTitle').attr('convid');
                channel.emit(MESSAGEEVENT.MESSAGE_SEND, {
                    'time': now,
                    'sender': username,
                    'txt': messageTxt,
                    'convID': convID,
                    'participants': target
                });
            }
            $("#txtBar").val('');
        });

        $(document.body).on('click', '.clickable', (event) => {
            let convID = $(event.target).attr('convid');
            let recipient = $(event.target).attr('username');
            $("#chatLogTitle").text("Conversation with " + recipient);
            $("#chatLogTitle").attr('convid', convID);
            $('#recipient').val(recipient);
            $("#recipient").attr('default', recipient);
            showConversation(convID);
        })

        let showConversation = function (convID) {
            $('#tblChatLog').empty();
            if (convID in conversationData) {
                let msgList = conversationData[convID];
                for (let i in msgList) {
                    showMsg(msgList[i]);
                }
            }
            else {
                return false;
            }
        };

        let showMsg = function (msg) {
            if (msg.sender == getCurrentUsername()) {
                $('#tblChatLog').append("<tr class=\"trMessage\"><td class=\"tdMessage self\"><label class=\"lblMessage\">" + msg.txt + "</label></td></tr>")
            }
            else {
                $('#tblChatLog').append("<tr class=\"trMessage\"><td class=\"tdMessage others\">" +
                    "<label class=\"lblSender\">" + msg.sender + ":</label>" +
                    "<label class=\"lblMessage\">" + msg.txt + "</label></td></tr>")
            }
            return false;
        }
        channel.on('messageDeliver', (message) => {
            let convID = message.convID;
            let participants = message.participants;
            if (convID in conversationData) {
                conversationData[convID].push(message);
                if (convID == $("#chatLogTitle").attr('convid')) {
                    showMsg(message);
                }
            }
            else { // new conversation
                conversationData[convID] = [message];
                let currentUser = getCurrentUsername();
                let ind = participants.findIndex((element) => { return element == currentUser });
                participants.splice(ind, 1);
                let recipient = participants.join(',');
                $('#onlineList').append("<li convID=\"" + convID + "\" username=\"" + recipient + "\" class=\"clickable\">" + recipient + "</li>");

            }
        })
    });
    return true;
});