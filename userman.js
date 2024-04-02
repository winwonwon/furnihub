const users = [
    { id: 1, firstname: "John", lastname: "Doe", username: "johndoe", password: "password1", email: "john@example.com", phone: "1234567890", registerDate: "2023-01-15" },
    { id: 2, firstname: "Alice", lastname: "Smith", username: "alicesmith", password: "password2", email: "alice@example.com", phone: "9876543210", registerDate: "2023-02-20" },
    { id: 3, firstname: "Michael", lastname: "Johnson", username: "michaeljohnson", password: "password3", email: "michael@example.com", phone: "4561237890", registerDate: "2023-03-25" },
    { id: 4, firstname: "Emily", lastname: "Brown", username: "emilybrown", password: "password4", email: "emily@example.com", phone: "7894561230", registerDate: "2023-04-30" },
    { id: 5, firstname: "David", lastname: "Lee", username: "davidlee", password: "password5", email: "david@example.com", phone: "3216549870", registerDate: "2023-05-05" }
];

function displayUsers(users) {
    const tbody = document.getElementById("user-list");
    tbody.innerHTML = ""; // Clear the table before adding new rows
    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.firstname} ${user.lastname}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.registerDate}</td>
        <td>
          <button class="edit-btn" data-id="${user.id}">Edit</button>
          <button class="delete-btn" data-id="${user.id}">Delete</button>
        </td>
      `;
        tbody.appendChild(row);
    });
}

// Function to handle the edit button click
function handleEditButtonClick(event) {
    const button = event.target;
    const userId = parseInt(button.getAttribute("data-id"));
    const userIndex = users.findIndex(user => user.id === userId); // Find the index of the user
    const user = users[userIndex]; // Retrieve the user using the index
    if (!user) {
        console.error("User not found");
        return;
    }

    const editPopup = document.getElementById("edit-user-popup");
    const firstnameInput = editPopup.querySelector("#edit-fname");
    const lastnameInput = editPopup.querySelector("#edit-lname");
    const usernameInput = editPopup.querySelector("#edit-username");
    const passwordInput = editPopup.querySelector("#edit-password");
    const emailInput = editPopup.querySelector("#edit-email");
    const phoneInput = editPopup.querySelector("#edit-phonenum");
    const registerDateInput = editPopup.querySelector("#edit-regdate");

    firstnameInput.value = user.firstname;
    lastnameInput.value = user.lastname;
    usernameInput.value = user.username;
    passwordInput.value = user.password;
    emailInput.value = user.email;
    phoneInput.value = user.phone;
    registerDateInput.value = user.registerDate;

    // Show the popup
    showPopup();

    // Remove event listeners before attaching new ones
    const saveBtn = editPopup.querySelector("#edit-user-save-btn");
    const closeBtn = editPopup.querySelector("#edit-user-close-btn");
    saveBtn.removeEventListener("click", handleEditSaveButtonClick);
    closeBtn.removeEventListener("click", handleCloseButtonClick);

    // Handle save button click
    saveBtn.addEventListener("click", () => {
        // Update user attributes with form values
        const updatedFirstname = firstnameInput.value;
        const updatedLastname = lastnameInput.value;
        const updatedUsername = usernameInput.value;
        const updatedPassword = passwordInput.value;
        const updatedEmail = emailInput.value;
        const updatedPhone = phoneInput.value;
        const updatedRegisterDate = registerDateInput.value;

        // Basic validation (can be extended)
        if (!updatedFirstname || !updatedLastname || !updatedUsername || !updatedPassword || !updatedEmail || !updatedPhone || !updatedRegisterDate) {
            alert("Please fill in all required fields.");
            return; // Prevent update if validation fails
        }

        // Update the user in the array
        users[userIndex] = {
            ...user,
            firstname: updatedFirstname,
            lastname: updatedLastname,
            username: updatedUsername,
            password: updatedPassword,
            email: updatedEmail,
            phone: updatedPhone,
            registerDate: updatedRegisterDate
        };

        // Update user list
        displayUsers(users);

        // Close the popup
        hidePopup();

        // Reattach event listeners for edit and delete buttons
        attachEditButtonListeners();
        attachDeleteButtonListeners();
    });

    // Handle close button click
    closeBtn.addEventListener("click", hidePopup);
}

// Function to show the popup
function showPopup() {
    const editPopup = document.getElementById("edit-user-popup");
    editPopup.classList.remove("hidden");
}

// Function to hide the popup
function hidePopup() {
    const editPopup = document.getElementById("edit-user-popup");
    editPopup.classList.add("hidden");
}

// Function to handle the save button click for editing
function handleEditSaveButtonClick() {
    // This function is handled within the handleEditButtonClick function above
    // No separate implementation needed here
    hidePopup();
}

// Function to handle the close button click
function handleCloseButtonClick(event) {
    // Close the popup
    hidePopup();
}

// Function to handle the delete button click
function handleDeleteButtonClick(event) {
    const button = event.target;
    const userId = parseInt(button.getAttribute("data-id"));
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        console.error("User not found");
        return;
    }

    // Show the delete confirmation popup
    showDeletePopup(userId);
}

// Event listener for the confirm delete button click
document.getElementById("confirm-delete").addEventListener("click", function () {
    const userId = parseInt(document.getElementById("delete-popup").getAttribute("data-user-id"));
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        console.error("User not found");
        return;
    }

    // Perform deletion
    users.splice(userIndex, 1);

    // Update user list
    displayUsers(users);

    // Hide the delete confirmation popup
    hideDeletePopup();

    // Reattach
    attachEditButtonListeners();
    attachDeleteButtonListeners();
});

// Event listener for the cancel delete button click
document.getElementById("cancel-delete").addEventListener("click", function () {
    // Hide the delete confirmation popup
    hideDeletePopup();
});

// Function to show the delete confirmation popup
function showDeletePopup(userId) {
    const deletePopup = document.getElementById("delete-popup");
    deletePopup.classList.remove("hidden");

    // Store the user ID in a data attribute of the popup for reference
    deletePopup.setAttribute("data-user-id", userId);
}

// Function to hide the delete confirmation popup
function hideDeletePopup() {
    const deletePopup = document.getElementById("delete-popup");
    deletePopup.classList.add("hidden");
}

// Function to attach event listeners to the Edit buttons
function attachEditButtonListeners() {
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach(button => {
        button.removeEventListener("click", handleEditButtonClick);
        button.addEventListener("click", handleEditButtonClick);
    });
}

// Function to attach event listeners to the Delete buttons
function attachDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.removeEventListener("click", handleDeleteButtonClick);
        button.addEventListener("click", handleDeleteButtonClick);
    });
}

// Function to show the add user popup
function showAddUserPopup() {
    const addUserPopup = document.getElementById("add-user-popup");
    addUserPopup.classList.remove("hidden");
    
    attachAddUserPopupButtonListeners();
}

// Function to hide the add user popup
function hideAddUserPopup() {
    const addUserPopup = document.getElementById("add-user-popup");
    addUserPopup.classList.add("hidden");
}

// Function to handle the add button click
function handleAddUserButtonClick(event) {
    // Show the add user popup
    showAddUserPopup();
}

// Function to handle the save button click for adding a new user
function handleAddUserSaveButtonClick() {
    // Get input values
    const newFirstName = document.getElementById("add-fname").value;
    const newLastName = document.getElementById("add-lname").value;
    const newUsername = document.getElementById("add-username").value;
    const newPassword = document.getElementById("add-password").value;
    const newEmail = document.getElementById("add-email").value;
    const newPhone = document.getElementById("add-phonenum").value;
    const newRegisterDate = document.getElementById("add-regdate").value;

    // Basic validation
    if (!newFirstName || !newLastName || !newUsername || !newPassword || !newEmail || !newPhone || !newRegisterDate) {
        alert("Please fill in all required fields with valid values.");
        return;
    }

    // Add the new user to the list (this should be replaced with database insertion logic)
    const newUser = {
        id: users.length + 1, // Assuming IDs are incremental
        firstname: newFirstName,
        lastname: newLastName,
        username: newUsername,
        password: newPassword,
        email: newEmail,
        phone: newPhone,
        registerDate: newRegisterDate
    };
    users.push(newUser);

    // Display the updated user list
    displayUsers(users);

    // Hide the add user popup
    hideAddUserPopup();

    // Reattach
    attachEditButtonListeners();
    attachDeleteButtonListeners();
}

// Function to handle the click event of the "Cancel" button in the add user popup
function handleAddUserCancelButtonClick() {
    // Hide the add user popup
    hideAddUserPopup();
}

// Function to attach event listeners to the "Save" and "Cancel" buttons in the add user popup
function attachAddUserPopupButtonListeners() {
    const addUserSaveBtn = document.getElementById("add-user-save-btn");
    addUserSaveBtn.addEventListener("click", handleAddUserSaveButtonClick);

    const addUserCloseBtn = document.getElementById("add-user-close-btn");
    addUserCloseBtn.addEventListener("click", handleAddUserCancelButtonClick);
}

// Function to attach event listener to the "Add User" button
function attachOpenAddPopupButtonListener() {
    const openAddUserPopupButton = document.getElementById("open-add-popup");
    openAddUserPopupButton.addEventListener("click", showAddUserPopup);
}

// Call functions to display users and attach event listeners
displayUsers(users);
attachOpenAddPopupButtonListener();
attachEditButtonListeners();
attachDeleteButtonListeners();
