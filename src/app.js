//Chargement du module serialport
var SerialPort = require('serialport');
var Readline = SerialPort.parsers.readline;
//création d'une instance serialport pour écouter le port série
var serialport = new SerialPort("/dev/ttyACM0", {
  baudRate: 9600,
  parity: 'none',
  flowControl: false,
  parser: Readline
});



//Chargement du module http
var http = require('http');
//Chargement du module fs
var fs = require('fs');
//Définition d'un délimiteur
const Delimiter = SerialPort.parsers.Delimiter;

// Chargement du fichier index.html affiché au client au cas où il se connecte au port 8080
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

//Chargement du module express
var express = require('express');
var app = express();

// Chargement du module socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on récupère les données du port série et on l'envoie sur le navigateur
io.sockets.on('connection', function (socket) {
        //console.log('un client est connecté.');
        serialport.pipe(new Delimiter({delimiter: '\n'})).on('data', function(data) {
        	console.log(data.toString());
            socket.emit('mesdonnees', data.toString());

    });

});

//on écoute le port 8080
server.listen(8080);