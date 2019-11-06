var Rooms = (function() {
    var pub = {};

    function parseRooms(data){
            $(data).find("hotelRoom").each(function () {
                if($(this).find("roomType").html() === "Single"){
                    var roomNum = $(this).find("number")[0].textContent;
                    var desc = $(this).find("description")[0].textContent;
                    var price = $(this).find("pricePerNight")[0].textContent;
                    alert(roomNum);
                    $("#single").append("<div><p>Room Number: " + roomNum + "</p><p>Description: " + desc + "</p><p>Price Per Night: " + price + "</p></div>");
                }
            });
    }

    pub.setup = function() {
        alert("debugging");
        $.ajax({
            type: "GET",
            url: "rooms/hotelRooms.xml",
            cache: false,
            success: function(data) {
                alert("Success");
                parseRooms(data);
            },
            error: function() {
                alert("An error occurred while processing XML file.");
            }
        });
    }

    return pub;
}());

$(document).ready(Rooms.setup);