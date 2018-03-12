const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');
const BotYoutube = require('botyoutube');
const BotCarrefour = require('botcarrefour');
const BotMeteo = require('botmeteo');
const BotUber = require('botuber');

app.use ('/', express.static(path.join(`${__dirname}/public`)));

app.get ('/', (req, res) => {
  res.sendfile('./index.html');
});

io.sockets.on('connection', socket => {
  socket.on('nouveau_client', pseudo => {
    socket.pseudo = pseudo;
    socket.broadcast.emit('nouveau_client', pseudo);
  });

  socket.on('message', message => {
    socket.broadcast.emit('message', {'pseudo': socket.pseudo, 'message': message});
  });

  socket.on('messageytb', message => {
    const tabVideos = [];
    const youtube = new BotYoutube(message);

    youtube.run();

    for (let i = 0; i < 3; i ++) {
      tabVideos.push({'id': youtube.getId(i), 'title': youtube.getTitleVideo(i), 'channelTitle': youtube.getTittleChanel(i), 'thumbnails': youtube.getThumbnails(i)});
    }
    socket.emit('messageytb', tabVideos);
  });

  socket.on('messageMeteo', message => {
    const meteo = new BotMeteo(message);

    meteo.run();

    const Weather = {'weather': meteo.getWeatherDesc(), 'temperature': meteo.getTemperature()};

    socket.emit('messageMeteo', Weather);
  });

  socket.on('messageCarrefour', message => {
    const tabCarrefour = [];
    const carrefour = new BotCarrefour (message);

    carrefour.run();

    for (let i = 0; i < carrefour.getJsonList().length; i ++) {
      tabCarrefour.push({'address': carrefour.getAdresse(i), 'banner': carrefour.getBanner(i), 'city': carrefour.getCity(i), 'gas_station': carrefour.getGasStation(i), 'drive': carrefour.getDrive(i), 'latitude': carrefour.getLatitude(i), 'longitude': carrefour.getLongitude(i)});
    }
    socket.emit('messageCarrefour', tabCarrefour);
  });

  socket.on('map', message =>{
    const uber = new BotUber(message);

    uber.run();

    const obj = {'endLatitude': uber.getEndLatitude(), 'startLatitude': uber.getStartLatitude(), 'startLongitude': uber.getStartLongitude(), 'endLongitude': uber.getEndLongitude(), 'uber': uber.getJsonPrice()};

    socket.emit('uber', obj);
  });
});

server.listen(8080);
