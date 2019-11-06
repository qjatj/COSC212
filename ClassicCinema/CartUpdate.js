var CartUpdate = (function() {
    var pub = {};
    var cart;
    var i;
    var list="";
    var li;
    var total = 0;
    //var form;

    pub.setup = function () {
        if(Cookie.get("shoppingcart") == null){
            $("#cart").append("<li>No items in Cart!</li>"); //document.getElementById("cart").innerHTML = "<li>No items in Cart!</li>";
            $("#checkoutForm").hide(); //form = document.getElementById("checkoutForm");
             //form.style.display = "none";
        }
        else {
            $("#checkoutForm").show();
            //form = document.getElementById("checkoutForm");
            //form.style.display ="block";
            cart = JSON.parse(Cookie.get("shoppingcart"));
            for(i = 0; i < cart.length; i++){
                li = cart[i];
                list += "<li>"+ li.title + " $" + li.price + "</li>";
                total += parseFloat(li.price);
            }
            $("#cart").append(list + "<li>Total: $" + total + "</li>");
            //document.getElementById("cart").innerHTML = list + "<li>Total: $" + total + "</li>";
        }

    };
    return pub;
}());

$(document).ready(CartUpdate.setup);