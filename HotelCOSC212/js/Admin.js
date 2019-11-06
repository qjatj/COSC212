/*global $ Cookie Constructors alert*/

/**
 * @desc A closure to for the main functionality on the Admin page
 * @requires Constructors.js, JQuery
 * @author Nick Meek
 * @created September 2018
 */
var Admin = (function () {
    "use strict";

    var pub = {}; //The public interface
    var bookings = []; //An list to hold Bookings

    /**
     * @desc Get the xml and make the list of booking objects
     * @returns {*|{readyState, getResponseHeader, getAllResponseHeaders, setRequestHeader, overrideMimeType, statusCode, abort}}
     */
    function makeBookingList() {
        return $.ajax({
            url: "./xml/roomBookings.xml",
            type: "GET",
            cache: false,
            success: function (data) {
                $(data).find("booking").each(function () {
                    bookings.push(new Constructors.Booking(
                        $(this).find("number").text(),
                        $(this).find("name").text(),
                        new Date(
                            $(this).find("checkin").find("year").text(),
                            $(this).find("checkin").find("month").text() - 1, //Date() months start at 0
                            $(this).find("checkin").find("day").text()),
                        new Date(
                            $(this).find("checkout").find("year").text(),
                            $(this).find("checkout").find("month").text() - 1, //Date() months start at 0
                            $(this).find("checkout").find("day").text()
                        )));
                });
            },
            error: function () {
                alert("Couldn't find file");
            }
        });
    }

    /**
     * @desc Generate the HTML to display all current bookings and place it in the page.
     */
    function displayAllBookings() {
        var output = "<h2>Current Confirmed Bookings</h2><dl>";
        $(bookings).each(function () {
            this.checkin = new Date(this.checkin);// make new date objects to sort out time zone problems
            this.checkout = new Date(this.checkout);//associated with JSON.stringifying Date() objects
            output += "<dt>" + this.roomNum + "</dt><dd>Name: " + this.guestName + ". <br>Checkin: " + this.checkin + ". <br>Checkout: " + this.checkout + ".</dd>";
        });
        output += "</dl>";

        $("#bookings").html(output);

    }

    /**
     * @desc Do the necessary setup and invocation
     */
    pub.setup = function () {
        //After the list of booking objects is made call the function to display them
        makeBookingList().done(function () {
            displayAllBookings();
        });
    };

    return pub; //expose the public interface
}());

$(document).ready(Admin.setup);