document.addEventListener("DOMContentLoaded", function () {
    // get elements from the DOM
    var menuIcon = document.getElementById("menuIcon");
    var navigation = document.getElementById("navigation");
    var closeIcon = document.getElementById("closeIcon");
    var registerSignIn = document.getElementById("registerSignIn");

    // toggle nav menu when menu icon is clicked
    menuIcon.addEventListener("click", function () {
        navigation.classList.toggle("active");
    });

    // close nav menu when close icon is clicked
    closeIcon.addEventListener("click", function () {
        navigation.classList.remove("active");
    });

    // redirect to login page when register/sign-in link is clicked
    registerSignIn.addEventListener("click", function (event) {
        event.preventDefault(); // prevent the default behavior of the anchor tag
        window.location.href = "../login";
    });

    // redirect to products page when "shop now" is clicked
    document.getElementById("shopNowBtn").addEventListener("click", function(event) {
        event.preventDefault(); // prevent the default behavior of the anchor tag
        window.location.href = "../products/products.html";
    });
});