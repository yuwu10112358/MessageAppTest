'use strict';

const { MESSAGEEVENT } = require("./../public/shared");
const { Conversation } = require("../models/Conversation")
const { UserServerSide } = require("./User-Server");


class MessageServerSide {
    static deliverMessage(server, participants, msg) {
        let sender = msg.sender;
        for (let i in participants) {
            let targetSocket = UserServerSide.getSocketFromUsername(participants[i]);
            if (targetSocket) {
                server.to(targetSocket).emit(MESSAGEEVENT.MESSAGE_DELIVER, msg);
            }
        }
        console.log('delivering message ' + msg.txt);
    }

    static deliverConversation(socket, convID) {
        Conversation.retrieveConversation(convID).then((convData) => {
            for (let i = 0; i < convData.messages.length; i++) {
                let newMsg = {
                    time: convData.messages[i].time,
                    sender: convData.messages[i].sender,
                    txt: convData.messages[i].txt,
                    convID : convID,
                    participants : convData.participants
                }
                socket.emit(MESSAGEEVENT.MESSAGE_DELIVER, newMsg);              
            }
        });
    }

}

module.exports = {
    MessageServerSide: MessageServerSide,
}