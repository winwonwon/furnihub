document.addEventListener("DOMContentLoaded", function () {
    // get elements from the DOM
    var menuIcon = document.getElementById("menuIcon");
    var navigation = document.getElementById("navigation");
    var closeIcon = document.getElementById("closeIcon");

    // toggle nav menu when menu icon is clicked
    menuIcon.addEventListener("click", function () {
        navigation.classList.toggle("active");
    });

    // close nav menu when close icon is clicked
    closeIcon.addEventListener("click", function () {
        navigation.classList.remove("active");
    });

    document.getElementById("logout").addEventListener("click", function() {
        // Perform logout actions here, such as clearing session data
        // Redirect to the homepage
        window.location.href = "/";
    });
    
});