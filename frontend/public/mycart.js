document.addEventListener("DOMContentLoaded", function () {
    // Get elements from the DOM
    var menubar = document.getElementById("menubar");
    var navigation = document.getElementById("navigation");
    var closeIcon = document.getElementById("closeIcon");

    // Toggle nav menu when menu icon is clicked
    menubar.addEventListener("click", function () {
        navigation.classList.toggle("active");
    });

    // Close nav menu when close icon is clicked
    closeIcon.addEventListener("click", function () {
        navigation.classList.remove("active");
    });
});