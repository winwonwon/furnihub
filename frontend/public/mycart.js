document.addEventListener("DOMContentLoaded", function() {
    // Get elements from the DOM
    var menubar = document.getElementById("menubar");
    var navigation = document.getElementById("navigation");
    var closeIcon = document.getElementById("closeIcon");

    // Toggle nav menu when menu icon is clicked
    menubar.addEventListener("click", function() {
        navigation.classList.toggle("active");
    });

    // Close nav menu when close icon is clicked
    closeIcon.addEventListener("click", function() {
        navigation.classList.remove("active");
    });

    // get all the menu items
    var menuItems = document.querySelectorAll(".navigation ul li a");

    // add click event listener to each menu item
    menuItems.forEach(function(item) {
        item.addEventListener("click", function(event) {
            event.preventDefault();
            // get the href attribute of the clicked menu item
            var page = this.getAttribute("href");
            window.location.href = page;
        });
    });
});