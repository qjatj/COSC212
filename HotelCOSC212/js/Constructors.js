/*global $*/
/**
 * @desc A set of Object constructors for RoomManager
 * @requires JQuery
 * @author Nick Meek
 * @created September 2018
 */
var Constructors = (function () {
    "use strict";

    var pub = {};

    /**
     * @desc Takes a string of space separated words and return the first word.
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
     * @constructor A Room represents one physical hotel room.
     * @param num The room number
     * @param type The room type
     * @param descr A description of the room
     * @param price The price per night
     */
    pub.Room = function (num, type, descr, price) {
        this.roomNum = num;
        this.roomType = type;
        this.description = descr;
        this.tarrif = price;

        this.makeHTML = function () {
            var className = getFirstWord(this.roomType);
            return "<tr id='room" + this.roomNum + "' class='" + className + "'><td>" +
                this.roomNum + " </td><td> " +
                this.roomType + " </td><td> " +
                this.description + "</td><td> " +
                this.tarrif +
                "</td><td><input type='radio' name='bookRoom' value='" +
                this.roomNum + "'></td></tr>";
        };
    };

    /**
     * @constructor A RoomType contains generic room information.
     * @param id The id of this room type
     * @param descr A short description of the room type
     * @param maxGuests The maximum number of guests this room type can accomodate
     */
    pub.RoomType = function (id, descr, maxGuests) {
        this.id = id;
        this.description = descr;
        this.maxGuests = maxGuests;
    };

    /**
     * @constructor A Booking for a particular room for one or more consecutive days.
     * @param num int: The number of the room that is booked
     * @param name String: Who the booking is for
     * @param checkin Date: When they will arrive
     * @param checkout Date: When they will leave
     */
    pub.Booking = function (num, name, checkin, checkout) {
        this.roomNum = num;
        this.guestName = name;
        this.checkin = checkin;
        this.checkout = checkout;
    };


    return pub;
}());

