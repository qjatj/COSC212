var Map = (function() {
    var pub = {};
    var headings;
    var i;
    var map;

    function onMapClick(e) {
        alert('You clicked the map at ' + e.latlng);
    }

    function centreMap(e) {
        if (this.textContent === 'Central') {
            markerLocation = [centralMarker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        }
        else if (this.textContent === 'North') {
            markerLocation = [northMarker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        }
        else if (this.textContent === 'South') {
            markerLocation = [southMarker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        }
    }

    pub.setup = function () {
        map = L.map('map').setView([-45.875, 170.500], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18,
            attribution: 'Map data &copy; ' +
            '<a href="http://www.openstreetmap.org/copyright">' +
            'OpenStreetMap contributors</a> CC-BY-SA'
        }).addTo(map);
        centralMarker = L.marker([-45.873937, 170.50311]).addTo(map);
        centralMarker.bindPopup(
            "<img class='popupimg' src='images/Metropolis.jpg'>" +
            "<div class='popuptext'><p><b>Central Store</b></p>" +
            "<p>Specialising in Classic Cinema</p></div>"
            );

        northMarker = L.marker([-45.8614, 170.512597]).addTo(map);
        northMarker.bindPopup(
            "<img class='popupimg' src='images/Plan_9_from_Outer_Space.jpg'>" +
            "<div class='popuptext'><p><b>North Store</b></p>" +
            "<p>Specialising in Science Fiction and Horror Cinema</p></div>"
            );

        southMarker = L.marker([-45.885894, 170.499371]).addTo(map);
        southMarker.bindPopup(
            "<img class='popupimg' src='images/Vertigo.jpg'>" +
            "<div class='popuptext'><p><b>South Store</b></p>" +
            "<p>Specialising in Alfred Hitchcock Cinema</p></div>");

        headings = document.getElementsByTagName("h3");
        for(i = 0; i < headings.length; i+=1){
            headings[i].onclick = centreMap;
            headings[i].style.cursor = "pointer";
        }

        map.on('click', onMapClick);
        map.on('click', centreMap);
    };
    return pub;
}());

if (window.addEventListener) {
    window.addEventListener("load", Map.setup);
} else if (window.attachEvent) {
    window.attachEvent("onload", Map.setup);
} else {
    alert("Could not attach ’MovieCategories.setup’ to the ’window.onload’ event");
}
