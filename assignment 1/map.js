var Map = (function() {
    var pub = {};
    var headings;
    var i;
    var map;

    function centreMap(e) {
        if (this.textContent === 'Fantasy Mini Golf') {
            markerLocation = [act1Marker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        }
        else if (this.textContent === 'Venetian Watch Tower') {
            markerLocation = [act2Marker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        }
        else if (this.textContent === 'Tsilivi Water Park') {
            markerLocation = [act3Marker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        } 

        else if (this.textContent === 'Taverna Akrotiri') {
            markerLocation = [rest1Marker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        } 

        else if (this.textContent === 'The Olive Tree') {
            markerLocation = [rest2Marker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        } 

        else if (this.textContent === 'Yum Yum Traditonal Greek Restaurant') {
            markerLocation = [rest3Marker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        } 

        else if(this.textContent === 'Toggle Activities') {
            if(map.hasLayer(act1Marker)){
                map.removeLayer(act1Marker);
                map.removeLayer(act2Marker);
                map.removeLayer(act3Marker);
            }
            else{
                act1Marker = L.marker([37.813776, 20.869525]).addTo(map);
                act1Marker.bindPopup(
                "<img class='popupimg' src='images/img7.jpg'>" +
                "<div class='popuptext'><p><b>Fantasy Mini Golf</b></p>" +
                "<p>Great family bonding time!</p></div>"
                );

                act2Marker = L.marker([37.821213, 20.867105]).addTo(map);
                act2Marker.bindPopup(
                "<img class='popupimg' src='images/img8.jpg'>" +
                "<div class='popuptext'><p><b>Venetian Watch Tower</b></p>" +
                "<p>Come here for the view of your life!</p></div>"
                );

                act3Marker = L.marker([37.820660, 20.859114]).addTo(map);
                act3Marker.bindPopup(
                "<img class='popupimg' src='images/img9.jpg'>" +
                "<div class='popuptext'><p><b>Tsilivi Water Park</b></p>" +
                "<p>Escape the sun and cool down!</p></div>"
                );
            }
        }

        else if(this.textContent === 'Toggle Restaurants') {
            if(map.hasLayer(rest1Marker)){
                map.removeLayer(rest1Marker);
                map.removeLayer(rest2Marker);
                map.removeLayer(rest3Marker);
            }
            else{
                rest1Marker = L.marker([37.806977, 20.891060]).addTo(map);
                rest1Marker.bindPopup(
                "<img class='popupimg' src='images/img10.jpg'>" +
                "<div class='popuptext'><p><b>Taverna Akrotiri</b></p>" +
                "<p>A taste of Greece!</p></div>"
                );

                rest2Marker = L.marker([37.811294, 20.871878]).addTo(map);
                rest2Marker.bindPopup(
                "<img class='popupimg' src='images/img11.jpg'>" +
                "<div class='popuptext'><p><b>The Olive Tree</b></p>" +
                "<p>Kebabs and more!</p></div>"
                );

                rest3Marker = L.marker([37.813362, 20.872386]).addTo(map);
                rest3Marker.bindPopup(
                "<img class='popupimg' src='images/img12.jpg'>" +
                "<div class='popuptext'><p><b>Yum Yum Traditonal Greek Restaurant</b></p>" +
                "<p>Traditional Greek Flavours!</p></div>"
                );
            }
        }
    }

    pub.setup = function () {
        map = L.map('map').setView([37.806190, 20.876420], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18,
            attribution: 'Map data &copy; ' +
            '<a href="http://www.openstreetmap.org/copyright">' +
            'OpenStreetMap contributors</a> CC-BY-SA'
        }).addTo(map);
        hotelMarker = L.marker([37.806190, 20.876420]).addTo(map);
        hotelMarker.bindPopup(
            "<img class='popupimg' src='images/img6.jpg'>" +
            "<div class='popuptext'><p><b>Hotel212</b></p>" +
            "<p>The best place to relax!</p></div>"
            );

        act1Marker = L.marker([37.813776, 20.869525]).addTo(map);
        act1Marker.bindPopup(
            "<img class='popupimg' src='images/img7.jpg'>" +
            "<div class='popuptext'><p><b>Fantasy Mini Golf</b></p>" +
            "<p>Great family bonding time!</p></div>"
            );

        act2Marker = L.marker([37.821213, 20.867105]).addTo(map);
        act2Marker.bindPopup(
            "<img class='popupimg' src='images/img8.jpg'>" +
            "<div class='popuptext'><p><b>Venetian Watch Tower</b></p>" +
            "<p>Come here for the view of your life!</p></div>"
            );

        act3Marker = L.marker([37.820660, 20.859114]).addTo(map);
        act3Marker.bindPopup(
            "<img class='popupimg' src='images/img9.jpg'>" +
            "<div class='popuptext'><p><b>Tsilivi Water Park</b></p>" +
            "<p>Escape the sun and cool down!</p></div>"
            );

        rest1Marker = L.marker([37.806977, 20.891060]).addTo(map);
        rest1Marker.bindPopup(
            "<img class='popupimg' src='images/img10.jpg'>" +
            "<div class='popuptext'><p><b>Taverna Akrotiri</b></p>" +
            "<p>A taste of Greece!</p></div>"
            );

        rest2Marker = L.marker([37.811294, 20.871878]).addTo(map);
        rest2Marker.bindPopup(
            "<img class='popupimg' src='images/img11.jpg'>" +
            "<div class='popuptext'><p><b>The Olive Tree</b></p>" +
            "<p>Kebabs and more!</p></div>"
            );

        rest3Marker = L.marker([37.813362, 20.872386]).addTo(map);
        rest3Marker.bindPopup(
            "<img class='popupimg' src='images/img12.jpg'>" +
            "<div class='popuptext'><p><b>Yum Yum Traditonal Greek Restaurant</b></p>" +
            "<p>Traditional Greek Flavours!</p></div>"
            );

        $(".click").click(centreMap).css('cursor', 'pointer');

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
