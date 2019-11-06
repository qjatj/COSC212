var MovieCategories = (function() {
    var pub = {};
    //var paragraphs, p, img, films, f, title;

    /*
    function showHideDetails () {
        paragraphs = this.parentNode.getElementsByTagName("p");
        img = this.parentNode.getElementsByTagName("img")[0];
        for(p = 0; p < paragraphs.length; p+=1){
            if (paragraphs[p].style.display === "none") {
                paragraphs[p].style.display = "block";
            } else {
                paragraphs[p].style.display = "none";
            }
        }
        if (img.style.display === "none") {
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }
    } */

    function showHideDetails() {
        $(this).siblings().toggle();
    }

    /* pub.setup = function () {
        films = document.getElementsByClassName("film");
        for(f = 0; f < films.length; f+=1) {
            title = films[f].getElementsByTagName("h3")[0];
            title.onclick = showHideDetails;
            title.style.cursor = "pointer";
        }
    }; */

    pub.setup = function () {
        $(".film").find("h3").click(showHideDetails).css('cursor', 'pointer');
    };
    return pub;
}());

/* if (window.addEventListener) {
    window.addEventListener("load", MovieCategories.setup);
} else if (window.attachEvent) {
    window.attachEvent("onload", MovieCategories.setup);
} else {
    alert("Could not attach ’MovieCategories.setup’ to the ’window.onload’ event");
} */

$(document).ready(MovieCategories.setup);