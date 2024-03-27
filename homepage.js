document.addEventListener("DOMContentLoaded", function() {
    // Get elements from the DOM
    var menuIcon = document.getElementById("menuIcon");
    var navigation = document.getElementById("navigation");
    var closeIcon = document.getElementById("closeIcon");
    var registerSignIn = document.getElementById("registerSignIn");
    var ikeaBrand = document.getElementById("ikea-brand");

    // Toggle nav menu when menu icon is clicked
    menuIcon.addEventListener("click", function() {
        navigation.classList.toggle("active");
    });

    // Close nav menu when close icon is clicked
    closeIcon.addEventListener("click", function() {
        navigation.classList.remove("active");
    });

    // Redirect to login page when register/sign-in link is clicked
    registerSignIn.addEventListener("click", function() {
        window.location.href = "login.html";
    });

    ikeaBrand.addEventListener("click", function(event) {
        // Prevent the default behavior of the anchor tag
        event.preventDefault();
        
        // Navigate to the product.html page
        window.location.href = "ikea_products.html";
    });
});