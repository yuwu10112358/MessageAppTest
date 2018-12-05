'use strict';
const express = require('express');
const socket = require('socket.io');
const swig = require('swig-templates');
const { registerUserServerEvents, registerMessageServerEvents } = require('./lib/EventHandling');

const app = express();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(express.static('public'));

const server = app.listen(3000);
const io = socket(server);

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/index/', (req, res) => {
    const url = req.url;
    const m = url.match(/index\?username=(.*)/);
    res.locals.username = m[1];
    res.render('index');
})

io.on('connection', (socket) => {
    console.log('connection started with socket ' + socket.id);
    socket.on('disconnect', (reason) => {
        console.log('socket ' + socket.id + ' has disconnected, the reason is ' + reason);
    })
    registerUserServerEvents(io, socket);
    registerMessageServerEvents(io, socket);
})


console.log('server launched');
