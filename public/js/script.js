const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      socket.emit("sendLocation", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

// Initialize the map and set its view to the specified coordinates and zoom level
const map = L.map("map").setView([0, 0], 10);

// Add a tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

const markers = {}

socket.on("recieveLocation", function (data) {
    const {id,latitude,longitude} = data;
   map.setView([latitude,longitude],16)
    if(markers[id]){
         markers[id].setLatLng([latitude,longitude])
    }
    else{
        markers[id] = L.marker([latitude,longitude]).addTo(map)
    }
});

socket.on("user-disconnect",function(){
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
    })

