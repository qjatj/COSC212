var Cart = (function() {
    var pub = {};
    var button, title, price;
    var mycart;

    function addCart () {
        var item = {};
        title = $(this).parent().parent().find("h3").html(); //this.parentNode.parentNode.getElementsByTagName("h3")[0].textContent;
        price = $(this).parent().find(".price").html(); //this.parentNode.getElementsByClassName("price")[0].textContent;
        item.title = title;
        item.price = price;
        if(Cookie.get("shoppingcart") == null){
            mycart = [];
            mycart.push(item);
            Cookie.set("shoppingcart", JSON.stringify(mycart));
        } else {
            mycart = JSON.parse(Cookie.get("shoppingcart"));
            mycart.push(item);
            Cookie.set("shoppingcart", JSON.stringify(mycart));
        }
    }

    pub.setup = function () {
        button =  $(".buy").click(addCart).css('cursor', 'pointer'); //document.getElementsByClassName("film");
    };

    return pub;

}());

$(document).ready(Cart.setup);