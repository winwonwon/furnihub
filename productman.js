
// YUNG MAI SEDDDDDD


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

// Function to handle the edit button click
function handleEditButtonClick(event) {
    const button = event.target;
    const productId = parseInt(button.getAttribute("data-id"));
    // Retrieve the product with the given ID
    const product = products.find(prod => prod.id === productId);
    if (!product) {
        console.error("Product not found");
        return;
    }

    // Create a form for editing product attributes
    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    fieldset.innerHTML = `
      <legend>Edit Product</legend>
      <label for="name">Name:</label>
      <input type="text" id="name" value="${product.name}"><br>
      <label for="category">Category:</label>
      <input type="text" id="category" value="${product.category}"><br>
      <label for="brand">Brand:</label>
      <input type="text" id="brand" value="${product.brand}"><br>
      <label for="stock">Stock:</label>
      <input type="number" id="stock" value="${product.stock}"><br>
      <label for="price">Price:</label>
      <input type="number" id="price" step="0.01" value="${product.price}"><br>
      <button type="button" id="save-btn">Save</button>
    `;
    form.appendChild(fieldset);

    // Show the form in a popup
    const popup = window.open("", "Edit Product", "width=400,height=400");
    popup.document.body.appendChild(form);

    // Handle save button click
    const saveBtn = form.querySelector("#save-btn");
    saveBtn.addEventListener("click", () => {
        // Update product attributes with form values
        product.name = popup.document.getElementById("name").value;
        product.category = popup.document.getElementById("category").value;
        product.brand = popup.document.getElementById("brand").value;
        product.stock = parseInt(popup.document.getElementById("stock").value);
        product.price = parseFloat(popup.document.getElementById("price").value);

        // Close the popup
        popup.close();

        // Refresh the product list
        displayProducts(products);
    });
}

// Function to handle the delete button click
function handleDeleteButtonClick(event) {
    const button = event.target;
    const productId = parseInt(button.getAttribute("data-id"));
    if (confirm(`Are you sure you want to delete product with ID: ${productId}?`)) {
        // Perform deletion action here, if required
        // For now, let's just show an alert
        alert(`Product with ID: ${productId} deleted`);
    }
}

// Function to attach event listeners to the Edit buttons
function attachEditButtonListeners() {
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.removeEventListener("click", handleEditButtonClick); // Remove existing event listener
        button.addEventListener("click", handleEditButtonClick); // Add new event listener
    });
}

// Function to attach event listeners to the Delete buttons
function attachDeleteButtonListeners() {
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.removeEventListener("click", handleDeleteButtonClick); // Remove existing event listener
        button.addEventListener("click", handleDeleteButtonClick); // Add new event listener
    });
}

// Call attachEditButtonListeners and attachDeleteButtonListeners initially to attach event listeners to the buttons
attachEditButtonListeners();
attachDeleteButtonListeners();

displayProducts(products);