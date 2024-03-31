const products = [
    { id: 1, name: "T-Shirt", category: "Clothing", brand: "Brand X", stock: 10, price: 20.00 },
    { id: 2, name: "Headphones", category: "Electronics", brand: "Brand Y", stock: 5, price: 50.00 },
    { id: 3, name: "Jeans", category: "Clothing", brand: "Brand Z", stock: 8, price: 30.00 },
    { id: 4, name: "Smartphone", category: "Electronics", brand: "Brand A", stock: 15, price: 300.00 },
    { id: 5, name: "Sneakers", category: "Footwear", brand: "Brand B", stock: 20, price: 50.00 }
];

// Function to display products in the table
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

// Function to handle the edit button click
function handleEditButtonClick(event) {
    const button = event.target;
    const productId = parseInt(button.getAttribute("data-id"));
    const productIndex = products.findIndex(prod => prod.id === productId); // Find the index of the product
    const product = products[productIndex]; // Retrieve the product using the index
    if (!product) {
        console.error("Product not found");
        return;
    }

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

    // Remove event listeners before attaching new ones
    const saveBtn = editPopup.querySelector("#save-btn");
    const closeBtn = editPopup.querySelector("#close-btn");
    saveBtn.removeEventListener("click", handleSaveButtonClick);
    closeBtn.removeEventListener("click", handleCloseButtonClick);

    // Handle save button click
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

        // Update the product in the array
        products[productIndex] = {
            ...product,
            name: updatedName,
            category: updatedCategory,
            brand: updatedBrand,
            stock: updatedStock,
            price: updatedPrice
        };

        // Update product list
        displayProducts(products);

        // Close the popup
        hidePopup();

        // Reattach event listeners for edit and delete buttons
        attachEditButtonListeners();
        attachDeleteButtonListeners();
    });

    // Handle close button click
    closeBtn.addEventListener("click", () =>{
        hidePopup()
    });
}


// Function to handle the save button click
function handleSaveButtonClick(event) {
    // Update product attributes with form values
    // Your code for updating the product goes here

    // Close the popup
    hidePopup();
}

// Function to handle the close button click
function handleCloseButtonClick(event) {
    // Close the popup
    hidePopup();
}

// Function to show the popup
function showPopup() {
    const editPopup = document.getElementById("edit-product-popup");
    editPopup.classList.remove("hidden");
}

// Function to hide the popup
function hidePopup() {
    const editPopup = document.getElementById("edit-product-popup");
    editPopup.classList.add("hidden");
}

// Function to handle the delete button click
function handleDeleteButtonClick(event) {
    const button = event.target;
    const productId = parseInt(button.getAttribute("data-id"));
    const productIndex = products.findIndex(prod => prod.id === productId);
    if (productIndex === -1) {
        console.error("Product not found");
        return;
    }

    // Show the delete confirmation popup
    showDeletePopup(productId);
}

// Event listener for the confirm delete button click
document.getElementById("confirm-delete").addEventListener("click", function () {
    const productId = parseInt(document.getElementById("delete-popup").getAttribute("data-product-id"));
    const productIndex = products.findIndex(prod => prod.id === productId);
    if (productIndex === -1) {
        console.error("Product not found");
        return;
    }

    // Perform deletion
    products.splice(productIndex, 1);

    // Update product list
    displayProducts(products);

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

// Function to show the add product popup
function showAddPopup() {
    const addPopup = document.getElementById("add-product-popup");
    addPopup.classList.remove("hidden");
    
    attachAddPopupButtonListeners();
}

// Function to hide the add product popup
function hideAddPopup() {
    const addPopup = document.getElementById("add-product-popup");
    addPopup.classList.add("hidden");
}

// Function to handle the add button click
function handleAddButtonClick(event) {
    // Show the add product popup
    showAddPopup();
}

// Function to handle the save button click
function handleAddSaveButtonClick() {
    // Get input values
    const newName = document.getElementById("add-name").value;
    const newCategory = document.getElementById("add-category").value;
    const newBrand = document.getElementById("add-brand").value;
    const newStock = parseInt(document.getElementById("add-stock").value);
    const newPrice = parseFloat(document.getElementById("add-price").value);

    // Basic validation
    if (!newName || !newCategory || !newBrand || isNaN(newStock) || isNaN(newPrice)) {
        alert("Please fill in all required fields with valid values.");
        return;
    }

    // Add the new product to the list (this should be replaced with database insertion logic)
    const newProduct = {
        id: products.length + 1, // Assuming IDs are incremental
        name: newName,
        category: newCategory,
        brand: newBrand,
        stock: newStock,
        price: newPrice
    };
    products.push(newProduct);

    // Display the updated product list
    displayProducts(products);

    // Hide the add product popup
    hideAddPopup();

    // Reattach
    attachEditButtonListeners();
    attachDeleteButtonListeners();
}

// Function to handle the click event of the "Cancel" button in the add product popup
function handleAddCancelButtonClick() {
    // Hide the add product popup
    hideAddPopup();
}

// Function to attach event listeners to the "Save" and "Cancel" buttons in the add product popup
function attachAddPopupButtonListeners() {
    const addSaveBtn = document.getElementById("add-save-btn");
    addSaveBtn.addEventListener("click", handleAddSaveButtonClick);

    const addCloseBtn = document.getElementById("add-close-btn");
    addCloseBtn.addEventListener("click", handleAddCancelButtonClick);
}

// Function to attach event listener to the "Add Product" button
function attachOpenAddPopupButtonListener() {
    const openAddPopupButton = document.getElementById("open-add-popup");
    openAddPopupButton.addEventListener("click", showAddPopup);
}

// Call functions to display products and attach event listeners
displayProducts(products);
attachEditButtonListeners();
attachDeleteButtonListeners();
attachOpenAddPopupButtonListener();
