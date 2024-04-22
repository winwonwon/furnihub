document.addEventListener("DOMContentLoaded", function () {
    // find the back icon element
    const backIcon = document.getElementById("backIcon");
    var menubar = document.getElementById("menuIcon");
    var navigation = document.getElementById("navigation");
    var closeIcon = document.getElementById("closeIcon");

    menubar.addEventListener("click", function () {
        navigation.classList.toggle("active");
    });

    // Close nav menu when close icon is clicked
    closeIcon.addEventListener("click", function () {
        navigation.classList.remove("active");
    });

    const users = []; // Initialize an empty array to store fetched users

    function fetchData(users) {
        return fetch('http://localhost:8085/api/users', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then(responseData => {
                if (responseData.error === false && Array.isArray(responseData.data)) {
                    // Extract the 'data' array from the response object
                    const fetchedUsers = responseData.data;

                    // Push each user from 'fetchedUsers' array into the provided 'usersArray'
                    fetchedUsers.forEach(user => {
                        users.push(user);
                    });

                    return users; // Return the array of fetched users
                } else {
                    console.error('Invalid response format:', responseData);
                    throw new Error('Invalid response format');
                }
            })
            .catch(error => {
                console.error('Error fetching or processing users:', error);
                throw error; // Propagate the error to the caller
            });
    }

    function displayUsers(users) {
        const tbody = document.getElementById("user-list");
        tbody.innerHTML = ""; // Clear the table before adding new rows
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${user.ACCOUNT_ID}</td>
        <td>${user.ACCOUNT_FNAME} ${user.ACCOUNT_LNAME}</td>
        <td>${user.ACCOUNT_USERNAME}</td>
        <td>${user.ACCOUNT_PASSWORD}</td>
        <td>${user.ACCOUNT_EMAIL}</td>
        <td>${user.ACCOUNT_PNUMBER}</td>
        <td>${user.ACCOUNT_CREATION_DATE}</td>
        <td>
          <button class="edit-btn" data-id="${user.ACCOUNT_ID}">Edit</button>
          <button class="delete-btn" data-id="${user.ACCOUNT_ID}">Delete</button>
        </td>
      `;
            tbody.appendChild(row);
        });
    }

    // Function to handle the edit button click
    function handleEditButtonClick(event) {
        const button = event.target;
        const userId = (button.getAttribute("data-id"));
        const userIndex = users.findIndex(user => user.ACCOUNT_ID === userId); // Find the index of the user
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

        firstnameInput.value = user.ACCOUNT_FNAME;
        lastnameInput.value = user.ACCOUNT_LNAME;
        usernameInput.value = user.ACCOUNT_USERNAME;
        passwordInput.value = user.ACCOUNT_PASSWORD;
        emailInput.value = user.ACCOUNT_EMAIL;
        phoneInput.value = user.ACCOUNT_PNUMBER;

        // Show the popup
        showPopup();

        // Remove event listeners before attaching new ones
        const saveBtn = editPopup.querySelector("#edit-user-save-btn");
        const closeBtn = editPopup.querySelector("#edit-user-close-btn");
        saveBtn.removeEventListener("click", handleEditSaveButtonClick);
        closeBtn.removeEventListener("click", handleCloseButtonClick);

        // Handle save button click
        saveBtn.addEventListener("click", async () => {
            // Update user attributes with form values
            const updatedFirstname = firstnameInput.value;
            const updatedLastname = lastnameInput.value;
            const updatedUsername = usernameInput.value;
            const updatedPassword = passwordInput.value;
            const updatedEmail = emailInput.value;
            const updatedPhone = phoneInput.value;

            // Basic validation (can be extended)
            if (!updatedFirstname || !updatedLastname || !updatedUsername || !updatedPassword || !updatedEmail || !updatedPhone) {
                alert("Please fill in all required fields.");
                return; // Prevent update if validation fails
            }

            // Update the user in the array
            const updatedUser = {
                ACCOUNT_FNAME: updatedFirstname,
                ACCOUNT_LNAME: updatedLastname,
                ACCOUNT_PNUMBER: updatedPhone,
                ACCOUNT_EMAIL: updatedEmail,
                ACCOUNT_USERNAME: updatedUsername,
                ACCOUNT_PASSWORD: updatedPassword,
            };

            try {
                const response = await fetch(`http://localhost:8085/api/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user: updatedUser })
                });

                if (!response.ok) {
                    throw new Error('Failed to update user.');
                }

                const data = await response.json();
                if (data.error) {
                    throw new Error(data.message);
                }

                // Update the user in the local array
                users[userIndex] = { ...users[userIndex], ...updatedUser };

                // Update user list display
                displayUsers(users);

                // Close the edit popup after successful update
                hidePopup();

                // Reattach event listeners for edit and delete buttons
                attachEditButtonListeners();
                attachDeleteButtonListeners();

                alert('User updated successfully.');
            } catch (error) {
                console.error('Error updating user:', error.message);
                alert('Failed to update user. Please try again.');
            }
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
        const userId = button.getAttribute("data-id");
        const userIndex = users.findIndex(user => user.ACCOUNT_ID === userId);
        if (userIndex === -1) {
            console.error("User not found");
            return;
        }

        // Show the delete confirmation popup
        showDeletePopup(userId);
    }

    // Event listener for the confirm delete button click
    document.getElementById("confirm-delete").addEventListener("click", async function () {
        const userId = (document.getElementById("delete-popup").getAttribute("data-user-id"));
        const userIndex = users.findIndex(user => user.ACCOUNT_ID === userId);
        if (userIndex === -1) {
            console.error("User not found");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8085/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user.');
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.message);
            }

            // Remove the deleted user from the local users array
            users.splice(userIndex, 1);

            // Update user list on the UI
            displayUsers(users);

            // Hide the delete confirmation popup
            hideDeletePopup();

            // Reattach event listeners for edit and delete buttons
            attachEditButtonListeners();
            attachDeleteButtonListeners();

            alert('User deleted successfully.');
        } catch (error) {
            console.error('Error deleting user:', error.message);
            alert('Failed to delete user. Please try again.');
        }
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

    function generateUserId() {
        const maxUserId = users.reduce((maxId, user) => {
            // Parse the current ACCOUNT_ID as an integer to handle leading zeros correctly
            const currentId = parseInt(user.ACCOUNT_ID, 10);
            return currentId > maxId ? currentId : maxId;
        }, 0);

        // Generate a new ACCOUNT_ID that is one more than the maximum found
        const newUserId = (maxUserId + 1).toString().padStart(3, '0'); // Ensure 3-digit format with leading zeros
        return newUserId;
    }

    // Function to handle the save button click for adding a new user
    async function handleAddUserSaveButtonClick() {
        // Get input values
        const newFirstName = document.getElementById("add-fname").value;
        const newLastName = document.getElementById("add-lname").value;
        const newUsername = document.getElementById("add-username").value;
        const newPassword = document.getElementById("add-password").value;
        const newEmail = document.getElementById("add-email").value;
        const newPhone = document.getElementById("add-phonenum").value;

        // Basic validation
        if (!newFirstName || !newLastName || !newUsername || !newPassword || !newEmail || !newPhone) {
            alert("Please fill in all required fields with valid values.");
            return;
        }

        try {
            const newUserId = await generateUserId(); // Assuming generateUserId() returns a promise
            console.log(newUserId)
            const currentDate = new Date();

            const newUser = {
                ACCOUNT_ID: newUserId, // Assuming IDs are incremental
                ACCOUNT_FNAME: newFirstName,
                ACCOUNT_LNAME: newLastName,
                ACCOUNT_PNUMBER: newPhone,
                ACCOUNT_EMAIL: newUsername,
                ACCOUNT_USERNAME: newUsername,
                ACCOUNT_PASSWORD: newPassword,
                ACCOUNT_LAST_LOGIN: currentDate.toISOString().slice(0, 19).replace('T', ' '),
                ACCOUNT_CREATION_DATE: currentDate.toISOString().slice(0, 19).replace('T', ' ')
            };

            const response = await fetch('http://localhost:8085/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: newUser })
            });

            if (!response.ok) {
                throw new Error('Failed to add new user.');
            }

            const data = await response.json();
            const insertedUser = data.user;

            // Assuming the response contains the inserted user data with ACCOUNT_ID

            users.push(insertedUser);
            displayUsers(users);
            hideAddUserPopup();
            attachEditButtonListeners();
            attachDeleteButtonListeners();
            alert('User added successfully.');

        } catch (error) {
            console.error('Error adding user:', error.message);
            alert('Failed to add new user. Please try again.');
        }
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

    document.addEventListener('DOMContentLoaded', async () => {
        try {
            await fetchData(users); // Pass the 'users' array to fetchData()

            // Now you can use the 'users' array for further processing (e.g., display in a table)
            displayUsers(users);
            attachEditButtonListeners();
            attachDeleteButtonListeners();
            attachOpenAddPopupButtonListener();
        } catch (error) {
            console.error('Failed to fetch users:', error);
            // Handle error (e.g., display an error message to the user)
        }
    });
});