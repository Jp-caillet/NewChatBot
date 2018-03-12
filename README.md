# chatBot

# Introduction

ceci est un Chat qui possede différent chatBot (youtube,uber,carrefour,meteo)

# Pré-requis

Installer `nodejs` & `npm`

# Comment l'utiliser

`git clone https://github.com/darlok77/NewChatBot.git`
`npm i`
`npm run start`

# Utilisation Bots

youtube: /youtube [nom_de_la_video]  
	liste 3 video correspondant au nom entrer

uber: /uber [nom_de_la_destination]  
  liste les ubers disponible, avec le prix

meteo: /meteo [nom_de_la_ville]  
  affiche la temperature et le temps

carrefour: /carrefour  
  liste des carrefour proche, avec leur information

# Function

 insereMessage()

| name | params | return | usage
| --- | --- | --- | ---
| +insereMessage() | pseudo, message | string | insert a message and pseudo in a chat   
| +insereVideo() | id | string | insert a youtube iframe in a chat 
| +selectionVideo() | data: Object  | string | display a list of video 
| +insereCarrefourMap() | longitude, latitude | string | insert a google map iframe with a position of the carrefour
| +selectionCarrefour()|data: Object | string | display a list of carrefour
| +insereUberMap()|endLatitude, endLongitude, startLatitude, startLongitude | string |  insert a google map iframe with a destination
| +selectionUber()|data: Object | string | display a list of uber
