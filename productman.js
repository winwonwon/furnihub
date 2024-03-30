// PULL FROM DATABASE
const products = [
    { id: 1, name: "T-Shirt", category: "Clothing", brand: "Brand X", stock: 10, price: 20.00 },
    { id: 2, name: "Headphones", category: "Electronics", brand: "Brand Y", stock: 5, price: 50.00 },
    { id: 3, name: "Jeans", category: "Clothing", brand: "Brand Z", stock: 8, price: 30.00 },
    { id: 4, name: "Smartphone", category: "Electronics", brand: "Brand A", stock: 15, price: 300.00 },
    { id: 5, name: "Sneakers", category: "Footwear", brand: "Brand B", stock: 20, price: 50.00 }
];

function displayProducts(products) {
    const tbody = document.getElementById("product-list");
    tbody.innerHTML = ""; // Clear the table before adding new rows
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.brand}</td>
        <td>${product.stock}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>
          <button class="edit-btn" data-id="${product.id}">Edit</button>
          <button class="delete-btn" data-id="${product.id}">Delete</button>
        </td>
      `;
        tbody.appendChild(row);
    });
}

// popup !!!!!!!!!!!

function showPopup() {
    const editPopup = document.getElementById("edit-product-popup");
    editPopup.classList.remove("hidden");
}

// Function to hide the popup
function hidePopup() {
    const editPopup = document.getElementById("edit-product-popup");
    editPopup.classList.add("hidden");
}

// !!!!!!!!!!!!!!!!!!!!EDIT ITEM FROM DATABASE !!!!!!!!!!!!!!!!!!!! //

// Function to handle the edit button click
function handleEditButtonClick(event) {
    //console.log("boo!");
    const button = event.target;
    const productId = parseInt(button.getAttribute("data-id"));
    // Retrieve the product with the given ID
    const product = products.find(prod => prod.id === productId);
    if (!product) {
        console.error("Product not found");
        return;
    }

    // Populate the form with product details
    const editPopup = document.getElementById("edit-product-popup");
    const nameInput = editPopup.querySelector("#name");
    const categoryInput = editPopup.querySelector("#category");
    const brandInput = editPopup.querySelector("#brand");
    const stockInput = editPopup.querySelector("#stock");
    const priceInput = editPopup.querySelector("#price");
    nameInput.value = product.name;
    categoryInput.value = product.category;
    brandInput.value = product.brand;
    stockInput.value = product.stock;
    priceInput.value = product.price;

    // Show the popup
    showPopup();
    //console.log("boo1111!");
    // Handle save button click
    const saveBtn = editPopup.querySelector("#save-btn");
    saveBtn.addEventListener("click", () => {
        // Update product attributes with form values
        const updatedName = nameInput.value;
        const updatedCategory = categoryInput.value;
        const updatedBrand = brandInput.value;
        const updatedStock = parseInt(stockInput.value);
        const updatedPrice = parseFloat(priceInput.value);

        // Basic validation (can be extended)
        if (!updatedName || !updatedCategory || !updatedBrand || !updatedStock || !updatedPrice) {
            alert("Please fill in all required fields.");
            return; // Prevent update if validation fails
        }

        product.name = updatedName;
        product.category = updatedCategory;
        product.brand = updatedBrand;
        product.stock = updatedStock;
        product.price = updatedPrice;

        // Update product list (replace with your logic to persist data)
        displayProducts(products); // Assuming you have a function to refresh the table

        // Close the popup
        hidePopup();
    });

    // Handle close button click (optional)
    const closeBtn = editPopup.querySelector("#close-btn");
    if (closeBtn) { // Check if close button exists
        closeBtn.addEventListener("click", () => {
            hidePopup();
        });
    }
}

// Functions to show/hide the popup (implementation based on your needs)
function showPopup() {
    const editPopup = document.getElementById("edit-product-popup");
    editPopup.classList.remove("hidden");
    // Add overlay logic if needed
}

function hidePopup() {
    const editPopup = document.getElementById("edit-product-popup");
    editPopup.classList.add("hidden");
    // Remove overlay logic if needed
}

function handleDeleteButtonClick(event) {
    const button = event.target;
    const productId = parseInt(button.getAttribute("data-id"));

    // Show the delete confirmation popup
    showDeletePopup(productId);
}

// !!!!!!!!!!!!!!!!!!!!DELETE FROM DATABASE !!!!!!!!!!!!!!!!!!!! //

// Event listener for the confirm delete button click
document.getElementById("confirm-delete").addEventListener("click", function () {
    const deletePopup = document.getElementById("delete-popup");
    const productId = parseInt(deletePopup.getAttribute("data-product-id"));

    // Perform deletion action here (replace this with your logic)
    console.log("Deleting product with ID:", productId);

    // Hide the delete confirmation popup
    hideDeletePopup();
});

document.getElementById("cancel-delete").addEventListener("click", function() {
    // Hide the delete confirmation popup
    hideDeletePopup();
});

// Function to show the delete confirmation popup
function showDeletePopup(productId) {
    const deletePopup = document.getElementById("delete-popup");
    deletePopup.classList.remove("hidden");

    // Store the product ID in a data attribute of the popup for reference
    deletePopup.setAttribute("data-product-id", productId);
}

// Function to hide the delete confirmation popup
function hideDeletePopup() {
    const deletePopup = document.getElementById("delete-popup");
    deletePopup.classList.add("hidden");
}

// Function to handle the delete button click
function handleDeleteButtonClick(event) {
    const button = event.target;
    const productId = parseInt(button.getAttribute("data-id"));

    // Show the delete confirmation popup
    showDeletePopup(productId);
}

// Event listener for the confirm delete button click
document.getElementById("confirm-delete").addEventListener("click", function () {
    const deletePopup = document.getElementById("delete-popup");
    const productId = parseInt(deletePopup.getAttribute("data-product-id"));

    // Perform deletion action here (replace this with your logic)
    console.log("Deleting product with ID:", productId);

    // Hide the delete confirmation popup
    hideDeletePopup();
});

// attaching !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Function to attach event listeners to the Edit buttons
function attachEditButtonListeners() {
    const editBtns = document.querySelectorAll(".edit-btn");
    console.log("Number of edit buttons found:", editBtns.length);
    editBtns.forEach(button => {
        console.log("Attaching event listener to edit button:", button);
        button.removeEventListener("click", handleEditButtonClick); // Remove existing event listener
        button.addEventListener("click", handleEditButtonClick); // Add new event listener
    });
}

// Function to attach event listeners to the Delete buttons
function attachDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    console.log("Number of delete buttons found:", deleteButtons.length);
    deleteButtons.forEach(button => {
        console.log("Attaching event listener to delete button:", button);
        button.removeEventListener("click", handleDeleteButtonClick); // Remove existing event listener
        button.addEventListener("click", handleDeleteButtonClick); // Add new event listener
    });
}

// call !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

displayProducts(products);
attachEditButtonListeners();
attachDeleteButtonListeners();