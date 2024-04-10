document.addEventListener("DOMContentLoaded", function () {
    // get elements from the DOM
    var menubar = document.getElementById("menubar");
    var navigation = document.getElementById("navigation");
    var closeIcon = document.getElementById("closeIcon");
    var advancedSearchButton = document.getElementById("advancedSearch");
    var popupContainer = document.getElementById("popupContainer");
    var overlay = document.getElementById("overlay");

    // toggle nav menu when menu icon is clicked
    menubar.addEventListener("click", function () {
        navigation.style.right = navigation.style.right === "0px" ? "-100%" : "0px";
    });

    // close nav menu when close icon is clicked
    closeIcon.addEventListener("click", function () {
        navigation.style.right = "-100%";
    });

    // show/hide advanced search form when "Advanced search" is clicked
    advancedSearchButton.addEventListener("click", function () {
        if (popupContainer.style.display === "none" || popupContainer.style.display === "") {
            popupContainer.style.display = "block";
            overlay.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent scrolling on the body
        } else {
            popupContainer.style.display = "none";
            overlay.style.display = "none";
            document.body.style.overflow = ""; // Re-enable scrolling on the body
        }
    });

    // hide advanced search form and overlay when cancel button is clicked
    document.getElementById("cancel").addEventListener("click", function () {
        popupContainer.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "";
    });

    // prevent overlay click from closing the menu
    overlay.addEventListener("click", function (event) {
        event.stopPropagation();
    });
});
