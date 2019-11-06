var Reviews = (function() {
    var pub = {};

    function parseReviews(data, target) {
        var html="";
        html += "<dl>";
        $(data).find("review").each(function () {
            var rating = $(this).find("rating")[0].textContent;
            var user = $(this).find("user")[0].textContent;
            html += "<dt>" + user + ": </dt>" + "<dd>" + rating + "</dd>";
        });
        html += "</dl>";
        target.html(html);
    }

    function showReviews() {
        var target = $(this).parent().find(".review");
        var link = $(this).parent().find("img").attr("src").replace("images", "reviews").replace("jpg", "xml");
        alert(link);
        $.ajax({
           type: "GET",
            url: link,
            cache: false,
            success: function(data) {
               if($(data).find("review").length > 0) {
                   parseReviews(data, target);
               }
               else {
                   target.html("<p>There are currently no reviews for the selected movie.</p>");
               }
            },
            error: function() {
               target.html("<p>There are currently no reviews for the selected movie.</p>");
            }
        });
    }

    pub.setup = function() {
        $(".film").append("<input type='button' class='showReviews' value='Show Reviews'>" + "<div class='review'></div>");
        $(".showReviews").click(showReviews).css('cursor', 'pointer');
    }

    return pub;
}());

$(document).ready(Reviews.setup);