'user strict';
require.config({
    paths: {
        jquery: 'http://code.jquery.com/jquery-latest.min',
        socketio: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'socketio': {
            exports: 'io'
        }
    }
})
requirejs(['./Users-client', './message-client'], function (UserClientSide, test) {
});