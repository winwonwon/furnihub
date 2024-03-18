document.addEventListener("DOMContentLoaded", function() {
    var menuIcon = document.getElementById("menuIcon");
    var navigation = document.getElementById("navigation");
    var closeIcon = document.getElementById("closeIcon");

    menuIcon.addEventListener("click", function() {
        navigation.classList.toggle("active");
    });

    closeIcon.addEventListener("click", function() {
        navigation.classList.remove("active");
    });
});