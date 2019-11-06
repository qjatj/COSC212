var movieList, movieIndex, str, title, image, page, makeHTML;

function nextMovie() {
    if(movieIndex == movieList.length){
        movieIndex = 0;
    }
    document.getElementById("carousel").innerHTML = movieList[movieIndex].makeHTML();
    movieIndex++;
}

function MovieCategory(title, image, page) {
    this.title = title;
    this.image = image;
    this.page = page;
    this.makeHTML = function() {
        return("<a href=" + page + "><figure><img src=" + image + "><figcaption>" + title + "</figcaption></figure></a>");
    }
}

function setup() {
    movieList = [];
    movieList.push(new MovieCategory("Classic Films","images/Metropolis.jpg","classic.html"));
    movieList.push(new MovieCategory("Science Fiction and Horror","images/Plan_9_from_Outer_Space.jpg","scifi.html"));
    movieList.push(new MovieCategory("Alfred Hitchcock","images/The_Birds.jpg","hitchcock.html"));
    movieIndex = 0;
    nextMovie();
    setInterval(nextMovie, 2000);
}

if (document.getElementById) {
    window.onload = setup;
}

