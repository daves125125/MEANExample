var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var webSocketServer = require('./websockets');

var app = express();

app.use(favicon(__dirname + '/assets/favicon.png'));

app.use(bodyParser.json());
app.use(express.static('assets'));

app.use(require('./auth'))

app.use(require('./controllers/api/posts'));
app.use(require('./controllers/api/users'));
app.use(require('./controllers/api/sessions'));

var server = app.listen(3001, function () {
    console.log('Server Listening on port:', 3001);
})

webSocketServer.connect(server);

