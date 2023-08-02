import L from "leaflet";

L.Icon.Default.prototype.options.imagePath = "img/pages/main/mapIcon/";

const map = L.map('map', {
	center: [50.46818, 30.51482],
	zoom: 17,
	attributionControl: false,
	zoomControl: false
});

const myIcon = L.icon({
	iconUrl: "img/pages/main/mapIcon/marker-icon.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	shadowUrl: "img/pages/main/mapIcon/marker-shadow.png",
	shadowSize: [41, 41],
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([50.46818, 30.51482], {icon: myIcon}).addTo(map);