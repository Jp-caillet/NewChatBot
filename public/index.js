const io = require('socket.io-client');
const socket = io.connect('http://localhost:8080');

const elZoneChat = document.querySelector('#zone_chat');
const elMessage = document.querySelector('#message');
const btnSend = document.querySelector('#logger');
let pseudo = '';

document.querySelector('#chat').style.visibility = 'hidden';

btnSend.addEventListener('click', e => {
  e.preventDefault();
  pseudo = document.querySelector('#login input').value;

  if (pseudo.length > 0) {
    document.querySelector('#chat').style.visibility = '';
    document.querySelector('#login').style.visibility = 'hidden';

    socket.emit('nouveau_client', pseudo);
    document.title = `${pseudo} - ${document.title}`;
    elMessage.focus();
  }
});
pseudo = document.querySelector('#login input').value;

/**
   * insereMessage
   * @return {node} elZoneChat
*/
const insereMessage = (pseudo, message) => {
  const msgContent = document.createTextNode (message);
  const msgPseudo = document.createTextNode(`${pseudo}  : `);
  const elNewDiv = document.createElement('div');
  const elNewB = document.createElement('b');

  elZoneChat.appendChild(elNewDiv);
  elNewDiv.appendChild(elNewB);
  elNewB.appendChild(msgPseudo);
  elNewDiv.appendChild(msgContent);
  elZoneChat.scrollTop = elZoneChat.scrollHeight;
};
/**
   * insereVideo
   * @return {node} elZoneChat
*/
const insereVideo = id => {
  const elNewIframe = document.createElement('iframe');

  elNewIframe.setAttribute('id', 'player');
  elNewIframe.setAttribute('type', 'text/html');
  elNewIframe.setAttribute('width', '640');
  elNewIframe.setAttribute('height', '360');
  elNewIframe.setAttribute('src', `http://www.youtube.com/embed/${id}`);

  elZoneChat.appendChild(elNewIframe);
};

/**
   * selectionVideo
   * @return {node} elZoneChat
*/
const selectionVideo = data => {
  const elNewDiv = document.createElement('div');

  data.forEach(element => {
    const elNewDiv2 = document.createElement('div');

    elNewDiv2.setAttribute('class', 'desc');
    elNewDiv2.setAttribute('id', 'video');

    const elNewImg = document.createElement('img');

    elNewImg.setAttribute('src', element.thumbnails);
    elNewImg.setAttribute('id', element.id);
    elNewImg.setAttribute('class', 'thumbnails');
    const elNewP = document.createElement('p');
    const elNewSpan = document.createElement('span');

    const title = document.createTextNode (element.title);
    const chanel = document.createTextNode (element.channelTitle);

    elNewP.appendChild(title);
    elNewSpan.appendChild(chanel);
    elNewDiv2.appendChild(elNewImg);
    elNewDiv2.appendChild(elNewP);
    elNewDiv2.appendChild(elNewSpan);

    elNewImg.addEventListener('click', () => {
      insereVideo(element.id);
    });

    elNewDiv.appendChild(elNewDiv2);
  });
  elZoneChat.appendChild(elNewDiv);
};

/**
   * insereCarrefourMap
   * @return {node} elZoneChat
*/
const insereCarrefourMap = (longitude, latitude) => {
  const elNewIframe = document.createElement('iframe');

  elNewIframe.setAttribute('width', '600');
  elNewIframe.setAttribute('height', '450');
  elNewIframe.setAttribute('frameborder', '0');
  elNewIframe.setAttribute('style', 'border:0');
  elNewIframe.setAttribute('src', `https://www.google.com/maps/embed/v1/place?key=AIzaSyBzhXQGlpp20V71dGCT_67REdUlWe-Gpog&q=${latitude},${longitude}`);

  elZoneChat.appendChild(elNewIframe);
};

/**
   * selectionCarrefour
   * @return {node} elZoneChat
*/
const selectionCarrefour = data => {
  const elNewDiv = document.createElement('div');

  data.forEach(element => {
    const elNewDiv2 = document.createElement('div');

    elNewDiv2.setAttribute('class', 'desc');
    elNewDiv2.setAttribute('id', 'carrefour');

    const elNewPAddress = document.createElement('p');
    const elNewPBanner = document.createElement('p');
    const elNewPService = document.createElement('p');

    const address = document.createTextNode (`${element.address} à `);
    const city = document.createTextNode (element.city);

    const banner = document.createTextNode (element.banner);

    let gasStation = document.createTextNode ('No gas station / ');

    if (element.gaStation !== 0) {
      gasStation = document.createTextNode ('gas station / ');
    }

    let drive = document.createTextNode ('No drive');

    if (element.drive !== 0) {
      drive = document.createTextNode ('drive');
    }

    elNewPAddress.appendChild(address);
    elNewPAddress.appendChild(city);
    elNewPBanner.appendChild(banner);
    elNewPService.appendChild(gasStation);
    elNewPService.appendChild(drive);

    elNewDiv2.appendChild(elNewPAddress);
    elNewDiv2.appendChild(elNewPBanner);
    elNewDiv2.appendChild(elNewPService);

    elNewDiv2.addEventListener('click', () => {
      insereCarrefourMap(element.longitude, element.latitude);
    });

    elNewDiv.appendChild(elNewDiv2);
  });
  elZoneChat.appendChild(elNewDiv);
};

/**
   * insereUberMap
   * @return {node} elZoneChat
*/
const insereUberMap = (endLatitude, endLongitude, startLatitude, startLongitude) => {
  const elNewIframe = document.createElement('iframe');

  elNewIframe.setAttribute('width', '600');
  elNewIframe.setAttribute('height', '450');
  elNewIframe.setAttribute('frameborder', '0');
  elNewIframe.setAttribute('style', 'border:0');
  elNewIframe.setAttribute('src', `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBzhXQGlpp20V71dGCT_67REdUlWe-Gpog&origin=${startLatitude},${startLongitude}&destination=${endLatitude},${endLongitude}&avoid=tolls|highways`);

  elZoneChat.appendChild(elNewIframe);
};

/**
   * selectionUber
   * @return {node} elZoneChat
*/
const selectionUber = data => {
  const elNewDiv = document.createElement('div');

  data.uber.forEach(element => {
    const elNewDiv2 = document.createElement('div');

    elNewDiv2.setAttribute('class', 'desc');
    elNewDiv2.setAttribute('id', 'uber');

    const elNewDivName = document.createElement('div');
    const elNewDivDuration = document.createElement('div');
    const elNewDivDistance = document.createElement('div');
    const elNewDivPrice = document.createElement('div');

    const name = document.createTextNode (` type :${element.display_name}`);
    const duration = document.createTextNode (`durrée : ${element.duration}s`);
    const distance = document.createTextNode (`distance ${element.distance}km`);
    const price = document.createTextNode (` prix: ${element.estimate}`);

    elNewDivName.appendChild(name);
    elNewDivDuration.appendChild(duration);
    elNewDivDistance.appendChild(distance);
    elNewDivPrice.appendChild(price);

    elNewDiv2.appendChild(elNewDivName);
    elNewDiv2.appendChild(elNewDivDuration);
    elNewDiv2.appendChild(elNewDivDistance);
    elNewDiv2.appendChild(elNewDivPrice);

    elNewDiv2.addEventListener('click', () => {
      insereUberMap(data.endLatitude, data.endLongitude, data.startLatitude, data.startLongitude);
    });

    elNewDiv.appendChild(elNewDiv2);
  });
  elZoneChat.appendChild(elNewDiv);
};

// receive a normal message
socket.on('message', data => {
  insereMessage(data.pseudo, data.message);
});
// receive message for a bot Carrefour
socket.on('messageCarrefour', data => {
  selectionCarrefour(data);
});
// receive message for a bot youtube
socket.on('messageytb', data => {
  selectionVideo(data);
});
// receive message for a bot uber
socket.on('uber', (data) => {
  selectionUber(data);
});
// receive message for a bot Meteo'
socket.on('messageMeteo', data=> {
  const content = document.createTextNode(` il fait ${data.temperature}°C et le temp est ${data.weather} `);
  const elNewDiv = document.createElement('div');

  elZoneChat.appendChild(elNewDiv);
  elNewDiv.appendChild(content);
  elZoneChat.scrollTop = elZoneChat.scrollHeight;
});

// send a new user log
socket.on('nouveau_client', pseudo=> {
  const content = document.createTextNode(`${pseudo} a rejoint le Chat !`);
  const elNewDiv = document.createElement('div');

  elZoneChat.appendChild(elNewDiv);
  elNewDiv.appendChild(content);
  elZoneChat.scrollTop = elZoneChat.scrollHeight;
});

elMessage.addEventListener ('keypress', e => {
  if (e.keyCode === 13) {
    let message = elMessage.value;

    if (message.indexOf('/youtube') !== - 1) {
      message = message.substring(message.indexOf('/youtube') + 9);
      // send a video name for a bot youtube
      socket.emit('messageytb', message);
    } else if (message.indexOf('/meteo') !== - 1) {
      // send a video city for a bot meteo
      message = message.substring(message.indexOf('/meteo') + 7);
      socket.emit('messageMeteo', message);
    } else if (message.indexOf('/uber') !== - 1) {
      // send a destination and coordone GPS for a bot uber
      const showPosition = position => {
        const positionGPS = {'lat': position.coords.latitude, 'lon': position.coords.longitude};

        message = message.substring(message.indexOf('/uber') + 6);
        const obj = {'coord': positionGPS, 'dest': message};

        socket.emit('map', obj);
      };
      const getLocation = ()=> {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        }
      };

      getLocation();
    } else if (message.indexOf('/carrefour') !== - 1) {
      // send a GPS coordone for a bot carrefour
      const showPosition = position => {
        const positionGPS = {'lat': position.coords.latitude, 'lon': position.coords.longitude};

        socket.emit('messageCarrefour', positionGPS);
      };
      const getLocation = ()=> {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        }
      };

      getLocation();
    } else {
      socket.emit('message', message); // send a normal message in other user
    }
    insereMessage(pseudo, message); // display a msg in our page
    elMessage.value = ''; // reset an area
    elMessage.focus(); // focus on a message area
  }
});

