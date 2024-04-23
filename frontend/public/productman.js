const products = []; // Initialize an empty array to store fetched products

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
});

function fetchData(products) {
    return fetch('http://localhost:8080/get-products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return response.json();
        })
        .then(responseData => {
            if (responseData.error === false && Array.isArray(responseData.data)) {
                // Extract the 'data' array from the response object
                const fetchedProducts = responseData.data;

                // Push each product from 'fetchedProducts' array into the provided 'productsArray'
                fetchedProducts.forEach(product => {
                    products.push(product);
                });

                console.log('Products fetched:', products);
                return products; // Return the array of fetched products
            } else {
                console.error('Invalid response format:', responseData);
                throw new Error('Invalid response format');
            }
        })
        .catch(error => {
            console.error('Error fetching or processing products:', error);
            throw error; // Propagate the error to the caller
        });
}



// Function to display products in the table
function displayProducts(products) {
    console.log('Products to display:', products); // Log fetched products

    const tbody = document.getElementById("product-list");
    tbody.innerHTML = ""; // Clear the table before adding new rows

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.PRODUCT_ID}</td>
            <td>${product.PRODUCT_NAME}</td>
            <td>${product.PRODUCT_CATEGORY}</td>
            <td>${product.PRODUCT_BRAND}</td>
            <td>${product.PRODUCT_QUANTITY}</td>
            <td>$${product.PRODUCT_PRICE}</td>
            <td>
                <button class="edit-btn" data-id="${product.PRODUCT_ID}">Edit</button>
                <button class="delete-btn" data-id="${product.PRODUCT_ID}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to handle the edit button click
function handleEditButtonClick(event) {
    const button = event.target;
    const productId = parseInt(button.getAttribute("data-id"));
    const productIndex = products.findIndex(prod => prod.PRODUCT_ID === productId); // Find the index of the product
    const product = products[productIndex]; // Retrieve the product using the index

    if (!product) {
        console.error("Product not found");
        return;
    }

    // Retrieve input values from the form
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const categoryInput = document.getElementById("category");
    const roomInput = document.getElementById("room");
    const brandInput = document.getElementById("brand");
    const quantityInput = document.getElementById("quantity");
    const priceInput = document.getElementById("price");
    const colorInput = document.getElementById("color");

    // Set input values to current product details
    nameInput.value = product.PRODUCT_NAME;
    descriptionInput.value = product.PRODUCT_DESCRIPTION;
    categoryInput.value = product.PRODUCT_CATEGORY;
    roomInput.value = product.PRODUCT_ROOM;
    brandInput.value = product.PRODUCT_BRAND;
    quantityInput.value = product.PRODUCT_QUANTITY;
    priceInput.value = product.PRODUCT_PRICE;
    colorInput.value = product.PRODUCT_COLOR;

    // Show the edit product popup
    showPopup();

    // Remove event listeners before attaching new ones to prevent duplicates
    const editPopup = document.getElementById("edit-product-popup");
    const saveBtn = editPopup.querySelector("#save-btn");
    const closeBtn = editPopup.querySelector("#close-btn");
    saveBtn.removeEventListener("click", handleSaveButtonClick); // Remove old save button listener
    closeBtn.removeEventListener("click", handleCloseButtonClick); // Remove old close button listener

    // Handle save button click within the edit popup
    saveBtn.addEventListener("click", async () => {
        const updatedProduct = {
            PRODUCT_NAME: nameInput.value,
            PRODUCT_DESCRIPTION: descriptionInput.value,
            PRODUCT_CATEGORY: categoryInput.value,
            PRODUCT_ROOM: roomInput.value,
            PRODUCT_BRAND: brandInput.value,
            PRODUCT_QUANTITY: parseInt(quantityInput.value),
            PRODUCT_PRICE: parseFloat(priceInput.value),
            PRODUCT_COLOR: colorInput.value
        };

        const fileInput = document.getElementById("edit-images");
        const formData = new FormData()
        formData.append("PRODUCT_NAME", nameInput.value);
        formData.append("PRODUCT_DESCRIPTION", descriptionInput.value);
        formData.append("PRODUCT_CATEGORY", categoryInput.value);
        formData.append("PRODUCT_ROOM", roomInput.value);
        formData.append("PRODUCT_BRAND", brandInput.value);
        formData.append("PRODUCT_QUANTITY", parseInt(quantityInput.value));
        formData.append("PRODUCT_PRICE", parseFloat(priceInput.value));
        formData.append("PRODUCT_COLOR", colorInput.value);
        if (fileInput.files.length > 0)
            formData.append("image", fileInput.files[0])
        try {
            const response = await fetch(`http://localhost:8080/update-products/${productId}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update product.');
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.message);
            }

            // Update the product in the local array
            products[productIndex] = { ...products[productIndex], ...updatedProduct };

            // Update product list display
            displayProducts(products);

            // Close the edit popup after successful update
            hidePopup();

            // Reattach event listeners for edit and delete buttons
            attachEditButtonListeners();
            attachDeleteButtonListeners();

            alert('Product updated successfully.');
        } catch (error) {
            console.error('Error updating product:', error.message);
            alert('Failed to update product. Please try again.');
        }
    });

    // Handle close button click within the edit popup
    closeBtn.addEventListener("click", () => {
        hidePopup();
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
    const productIndex = products.findIndex(prod => prod.PRODUCT_ID === productId);
    if (productIndex === -1) {
        console.error("Product not found");
        return;
    }

    // Show the delete confirmation popup
    showDeletePopup(productId);
}

// Event listener for the confirm delete button click
document.getElementById("confirm-delete").addEventListener("click", async function () {
    const productId = parseInt(document.getElementById("delete-popup").getAttribute("data-product-id"));
    const productIndex = products.findIndex(prod => prod.PRODUCT_ID === productId);
    
    if (productIndex === -1) {
        console.error("Product not found");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/delete-products/${productId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete product.');
        }

        const data = await response.json();
        if (data.error) {
            throw new Error(data.message);
        }

        // Remove the deleted product from the local products array
        products.splice(productIndex, 1);

        // Update product list on the UI
        displayProducts(products);

        // Hide the delete confirmation popup
        hideDeletePopup();

        // Reattach event listeners for edit and delete buttons
        attachEditButtonListeners();
        attachDeleteButtonListeners();

        alert('Product deleted successfully.');
    } catch (error) {
        console.error('Error deleting product:', error.message);
        alert('Failed to delete product. Please try again.');
    }
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

async function handleAddSaveButtonClick() {
    const newName = document.getElementById("add-name").value;
    const newDescription = document.getElementById("add-description").value;
    const newCategory = document.getElementById("add-category").value;
    const newRoom = document.getElementById("add-room").value;
    const newBrand = document.getElementById("add-brand").value;
    const newQuantity = parseInt(document.getElementById("add-quantity").value);
    const newPrice = parseFloat(document.getElementById("add-price").value);
    const newColor = document.getElementById("add-color").value;

    // Basic validation
    if (!newName || !newDescription || !newCategory || !newRoom || !newBrand || isNaN(newQuantity) || isNaN(newPrice) || !newColor) {
        alert("Please fill in all required fields with valid values.");
        return;
    }

    try {
        const fileInput = document.getElementById("add-images");
        const formData = new FormData()

        formData.append("PRODUCT_NAME", newName);
        formData.append("PRODUCT_DESCRIPTION", newDescription);
        formData.append("PRODUCT_CATEGORY", newCategory);
        formData.append("PRODUCT_ROOM", newRoom);
        formData.append("PRODUCT_BRAND", newBrand);
        formData.append("PRODUCT_QUANTITY", newQuantity);
        formData.append("PRODUCT_PRICE", newPrice);
        formData.append("PRODUCT_COLOR", newColor);
        formData.append("PRODUCT_PICTURE1", fileInput.files[0]);
        formData.append("PRODUCT_PICTURE2", '');
        formData.append("PRODUCT_PICTURE3", '');
        formData.append("PRODUCT_PICTURE4", '');
        const response = await fetch('http://localhost:8080/insert-products', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to add new product.');
        }

        const data = await response.json();
        const insertedProduct = data.product;
        // Assuming the response contains the inserted product data with PRODUCT_ID

        products.push(insertedProduct);
        displayProducts(products);
        hideAddPopup();
        attachEditButtonListeners();
        attachDeleteButtonListeners();
        alert('Product added successfully.');
       
        //clear form
        document.getElementById("add-name").value = '';
        document.getElementById("add-description").value = '';
        document.getElementById("add-category").value = '';
        document.getElementById("add-room").value = '';
        document.getElementById("add-brand").value = '';
        document.getElementById("add-quantity").value = '';
        document.getElementById("add-price").value = '';
        document.getElementById("add-color").value = '';
        document.getElementById("add-images").value = '';
    } catch (error) {
        console.error('Error adding product:', error.message);
        alert('Failed to add new product. Please try again.');
    }
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

// image add
document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("add-images");
    const dropArea = document.getElementById("drop-area");
    const fileNameInput = document.getElementById("add-file-name");

    // Event listener for the choose file button
    document.getElementById("add-file-btn").addEventListener("click", function() {
        fileInput.click(); // Trigger click event on file input
    });

    // Event listener for file input change
    fileInput.addEventListener("change", function() {
        const files = fileInput.files;
        if (files.length > 0) {
            fileNameInput.value = files[0].name; // Display the selected file name
        }
    });

    // Prevent default behavior for drag events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when a file is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    // Remove highlighting when a file is dragged out of the drop area
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle file drop
    dropArea.addEventListener('drop', handleDrop, false);

    // Prevent default behavior for drag events
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when a file is dragged over it
    function highlight() {
        dropArea.classList.add('highlight');
    }

    // Remove highlighting when a file is dragged out of the drop area
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }

    // Handle file drop
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files; // Set the dropped files to the file input
        if (files.length > 0) {
            fileNameInput.value = files[0].name; // Display the selected file name
        }
    }
});

// image edit
document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("edit-images");
    const dropArea = document.getElementById("drop-area");
    const fileNameInput = document.getElementById("edit-file-name");

    // Event listener for the choose file button
    document.getElementById("edit-file-btn").addEventListener("click", function() {
        fileInput.click(); // Trigger click event on file input
    });

    // Event listener for file input change
    fileInput.addEventListener("change", function() {
        const files = fileInput.files;
        if (files.length > 0) {
            fileNameInput.value = files[0].name; // Display the selected file name
        }
    });

    // Prevent default behavior for drag events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when a file is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    // Remove highlighting when a file is dragged out of the drop area
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle file drop
    dropArea.addEventListener('drop', handleDrop, false);

    // Prevent default behavior for drag events
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when a file is dragged over it
    function highlight() {
        dropArea.classList.add('highlight');
    }

    // Remove highlighting when a file is dragged out of the drop area
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }

    // Handle file drop
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files; // Set the dropped files to the file input
        if (files.length > 0) {
            fileNameInput.value = files[0].name; // Display the selected file name
        }
    }
});

// Call functions to display products and attach event listeners
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await fetchData(products); // Pass the 'products' array to fetchData()

        // Now you can use the 'products' array for further processing (e.g., display in a table)
        displayProducts(products);
        attachEditButtonListeners();
        attachDeleteButtonListeners();
        attachOpenAddPopupButtonListener();
    } catch (error) {
        console.error('Failed to fetch products:', error);
        // Handle error (e.g., display an error message to the user)
    }
});
