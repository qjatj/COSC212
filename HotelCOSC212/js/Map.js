/*global L*/

/**
 * @desc A closure that manages the map, map options and markers on the Admin page
 * @requires JQuery
 * @author Nick Meek
 * @created September 2018
 * @updated September 2018
 */
var Map = (function () { //The anonymous function here is used to create a private scope for a module
    "use strict";
    var pub = {}; //public interface

    /** Displays the map and add the markers with some information.
     *
     */
    pub.setup = function () {
        //Add the map
        var myMap = L.map("map").setView([-45.872, 170.505], 15);

        // Set up markers for all the locations
        var hotelMarker = L.marker([-45.872, 170.505]);
        var restaurant1 = L.marker([-45.874, 170.501]);
        var restaurant2 = L.marker([-45.868, 170.507]);
        var restaurant3 = L.marker([-45.871, 170.504]);
        var activity1 = L.marker([-45.874, 170.503]);
        var activity2 = L.marker([-45.866, 170.511]);
        var activity3 = L.marker([-45.875, 170.509]);

        //Make the layer groups
        var restaurants = L.layerGroup([restaurant1, restaurant2, restaurant3]);
        var activities = L.layerGroup([activity1, activity2, activity3]);

        var overlayMaps = {
            "Restaurants": restaurants,
            "Activities" : activities
        };

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
            maxZoom: 18,
            attribution: "Map data & copy; " + "<a href= 'http://www.openstreetmap.org/copyright'>" + "OpenStreetMap contributors </a> CC-BY-SA"
            }).addTo(myMap);

        //add the popups
        hotelMarker.addTo(myMap);
        hotelMarker.bindPopup("<img src='./js/leaflet/images/attractionImages/hotel.png' alt='Hotel COSC212'>" + "<b>Hotel COSC212</b>" + "<p>200 George Street</p>");

        restaurant1.addTo(myMap);
        restaurant1.bindPopup("<img src='./js/leaflet/images/attractionImages/plant.png' alt='Vegetarian Food'>" + "<b>Vegetarian Food</b>" + "<p>Moray Pl</p>");

        restaurant2.addTo(myMap);
        restaurant2.bindPopup("<img src='./js/leaflet/images/attractionImages/film.png' alt='Film Cafe'>" + "<b>Eat and Watch</b>" + "<p>London St</p>");

        restaurant3.addTo(myMap);
        restaurant3.bindPopup("<img src='./js/leaflet/images/attractionImages/fish.png' alt='Fish'>" + "<b>Fish</b>" + "<p>Andrew St</p>");

        activity1.addTo(myMap);
        activity1.bindPopup("<img src='./js/leaflet/images/attractionImages/frog.png' alt='Aquarium'>" + "<b>Aquarium</b>" + "<p>Octagon</p>");

        activity2.addTo(myMap);
        activity2.bindPopup("<img src='./js/leaflet/images/attractionImages/squirrel.png' alt='Otago Museum'>" + "<b>Otago Museum</b>" + "<p>Great King St</p>");

        activity3.addTo(myMap);
        activity3.bindPopup("<img src='./js/leaflet/images/attractionImages/ant.png' alt='Dunedin Railways'>" + "<b>Dunedin Railways</b>" + "<p>Anzac Av</p>");

        L.control.layers(null, overlayMaps).addTo(myMap);
        };



    return pub;

}());

$(document).ready(Map.setup);