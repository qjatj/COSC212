/*global $ Cookie Constructors alert*/
/**
 * @desc A closure that manages booking of hotel rooms
 * @requires JQuery, Constructors.js
 * @author Nick Meek
 * @created September 2018
 */
var RoomManager = (function () {
    "use strict";
    var rooms = []; // All the rooms in the hotel
    var roomTypes = []; // All the different room types
    var bookings = []; // All the current bookings
    var pub = {}; // public interface

    /**
     * Takes a string of space separated words and returns the first word.
     * @param word A string of one or more words
     * @return The first word of the string
     */
    function getFirstWord(word) {
        var firstWord;
        if (!word) {
            return;
        }
        if (word.indexOf(" ") === -1) {
            firstWord = word;
        } else {
            firstWord = word.substr(0, word.indexOf(" "));
        }
        return firstWord;
    }

    /**
     * Get the xml and make the list of booking objects
     */
    function makeBookingList() {
        $.ajax({
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
     * Get the xml and make the list of room objects
     */
    function makeRoomList() {
        //note return of derferred object
        return $.ajax({
            url: "./xml/hotelRooms.xml",
            type: "GET",
            cache: false,
            success: function (data) {
                $(data).find("hotelRoom").each(function () {
                    rooms.push(new Constructors.Room(
                        $(this).find("number").text(),
                        $(this).find("roomType").text(),
                        $(this).find("description").text(),
                        $(this).find("pricePerNight").text()));
                });
            },
            error: function () {
                alert("Couldn't find file");
            }
        });
    }

    /**
     * Get the xml and make the list of roomType objects
     */
    function makeRoomTypeList() {
        $.ajax({
            url: "./xml/roomTypes.xml",
            type: "GET",
            cache: false,
            success: function (data) {
                $(data).find("roomType").each(function () {
                    roomTypes.push(new Constructors.RoomType(
                        $(this).find("id").text(),
                        $(this).find("description").text(),
                        $(this).find("maxGuests").text()));
                });
            },
            error: function () {
                alert("Couldn't find file");
            }
        });
    }

    /**
     * Get the roomType information for this element
     * Called by hovering over a hotel room.
     */
    function showRoomDescription() {
        var i;
        var key = getFirstWord($(this).attr("class"));
        if (key) {//only do this if key has a value - won't for table header row
            for (i = 0; i < roomTypes.length; i += 1) {
                if (getFirstWord(roomTypes[i].id) === key) {
                    $("#roomType").html("<p>ID: " + roomTypes[i].id +
                        "</p><p> Description: " + roomTypes[i].description +
                        "</p><p> MaxGuests: " + roomTypes[i].maxGuests + "</p>");
                }
            }
        }
    }

    /**
     * Empty the roomType description.
     * Called when the mouse leaves a hotel room
     */
    function clearRoomDescription() {
        $("#roomType").empty();
    }

    /**
     * Display information about all rooms
     */
    function displayAllRooms() {
        var tableHTML = "<h2>Our Rooms</h2><table> <tr><th>Number</th><th>Type</th><th>Description</th><th>Tarrif</th><th>Book?</th></tr>";
        $("#output").empty();
        $(rooms).each(function () {
            tableHTML += this.makeHTML();
        });
        tableHTML +="</table>";
        $("#output").html(tableHTML);
        $("#output tr").hover(showRoomDescription, clearRoomDescription).css("cursor", "pointer");
    }


    /**
     * A function that adds a booking to the pendingBookings on the Cookie
     * @param booking The booking object to be added
     */
    function makeNewBooking(booking) {
        /* In the final version changes will be made to xml on the server and so the actions
        *  done here will change in the second assignment.
        *  */
        var pendingBookings = Cookie.get("hotelBooking");
        if (pendingBookings) {
            pendingBookings = JSON.parse(pendingBookings);
        } else {
            pendingBookings = [];
        }
        pendingBookings.push(booking);
        Cookie.set("hotelBooking", JSON.stringify(pendingBookings));
    }

    /**
     * Checks if each room is available on the selected dates.
     * Greys and makes un-selectable unavailable rooms.
     */
    function checkAvailability() {
        var checkInDate = new Date(parseInt($("#arriveYear").val()), parseInt($("#arriveMonth").val()), parseInt($("#arriveDay").val()));
        var checkOutDate = new Date(parseInt($("#leaveYear").val()), parseInt($("#leaveMonth").val()), parseInt($("#leaveDay").val()));

        /** Reset the styling on the available rooms **/
        $("#output tr").css("color", "inherit");
        $("#output tr input").css("display", "inline");
        $("#output input[type='radio']").prop("checked", false); //uncheck any radio buttons

        //check to see if any rooms are booked during the requested dates
        $(bookings).each(function () {
            if ((this.checkin.getTime() >= checkInDate.getTime() && this.checkin.getTime() < checkOutDate.getTime()) ||
                (this.checkout.getTime() > checkInDate.getTime() && this.checkout.getTime() <= checkOutDate.getTime())) {
                //Dates overlap so grey them out and make them unselectable.
                $("#room" + this.roomNum).css("color", "lightgrey");
                $("#room" + this.roomNum + " input").css("display", "none");//remove radio button
            }
        });
    }

    /**
     * Check all the details of the booking are acceptable. In particular:
     * The dates are proper (not in past, at least 1 day apart etc,
     * A room has been selected,
     * A name has been entered
     */
    function checkBooking() {
        var bookingRoomNumber = $("#output input:checked").val();
        var checkInDate = new Date(parseInt($("#arriveYear").val()), parseInt($("#arriveMonth").val()), parseInt($("#arriveDay").val()));
        var checkOutDate = new Date(parseInt($("#leaveYear").val()), parseInt($("#leaveMonth").val()), parseInt($("#leaveDay").val()));
        var bookingName = $("#guestName").val();
        var errorMsg = "";
        var now = new Date();

        // Check room selected
        if (!$("input[name='bookRoom']:checked").length) {
            errorMsg += "<p>Please select a room</p>";
        }

        //Check name not empty
        if ($("#guestName").val().length === 0) {
            errorMsg += "<p>Please tell us your name.</p>";
        }
        //Check dates
        //Dates must be in future
        if (checkInDate < now || checkOutDate < now) {
            errorMsg += "<p>Check-in/Check-out dates must be in the future</p>";
        }

        //Check-in must be before check-out
        if (checkInDate > checkOutDate) {
            errorMsg += "<p>Check-in date must be prior to check-out date</p>";
        }

        //Check-out date must be at least one day after check-in date
        if (checkOutDate.getTime() === checkInDate.getTime()) {
            errorMsg += "<p>Check-out date must be at least 1 day after check-in date</p>";
        }

        //see if there were any errors and act appropriately
        if (errorMsg) {
            $("#errors").html("<h2>Errors</h2>" + errorMsg);
            return false;
        } else {
            $("#errors").empty();
            makeNewBooking(new Constructors.Booking(bookingRoomNumber, bookingName, checkInDate, checkOutDate));
            return true;
        }
    }

    /**
     * Builds a list of pending bookings held on the cookie and displays them on the page
     */
    function showPendingBookings() {
        var pendingBookings = Cookie.get("hotelBooking");
        if (pendingBookings) {
            pendingBookings = JSON.parse(pendingBookings);
            var output = "<h2>Pending Bookings</h2><dl>";
            $(pendingBookings).each(function () {
                this.checkin = new Date(this.checkin);// make new date objects to sort out time zone problems
                this.checkout = new Date(this.checkout);//associated with JSON.stringifying Date() objects
                output += "<dt>" + this.roomNum +
                    "</dt><dd>Name: " + this.guestName +
                    ". <br>Checkin: " + this.checkin +
                    ". <br>Checkout: " + this.checkout +
                    ".</dd>";
            });
            output += "</dl>";

            $("#pendingBookings").empty().html(output);
        }
    }


    pub.setup = function () {
        //Call the functions that populate the data structures
        makeBookingList();
        makeRoomTypeList();
        //After this one completes it does some other stuff
        makeRoomList().done(function () {
            displayAllRooms();
        });
        showPendingBookings();

        //Set up some event listeners
        $("#bookingForm").submit(checkBooking);
        $("select").change(checkAvailability);
    };


    return pub;
}());

$(document).ready(RoomManager.setup);