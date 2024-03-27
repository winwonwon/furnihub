document.addEventListener("DOMContentLoaded", function() {
    const filterIcon = document.querySelector(".filter_icons i");
    const filterForm = document.querySelector(".filter_form");
    const overlay = document.querySelector(".overlay");
    const body = document.body;
    const productContainer = document.querySelector(".ikea");

    // Function to toggle filter form and overlay
    function toggleFilterForm() {
        if (filterForm.style.display === "block") {
            filterForm.style.display = "none";
            overlay.style.display = "none";
        } else {
            filterForm.style.display = "block";
            overlay.style.display = "block";
        }
        body.classList.toggle("filter_active");
    }

    // Event listener to toggle filter form and overlay when filter icon is clicked
    filterIcon.addEventListener("click", toggleFilterForm);

    // Redirect to homepage when back icon is clicked
    document.getElementById("backIcon").addEventListener("click", function() {
        window.location.href = "homepage.html";
    });  

    // Define an array of products
    const products = [
        {
            id: 108,
            name: "BORGEBY",
            description: "BORGEBY storage table has an elegant, simple and stylish design with a harmonious and balanced expression. The rounded airy shape, smooth surface and natural material make the table suitable for many different living situations and interior styles.",
            stock: 53,
            category: "Desk",
            room: "Living room",
            brand: "IKEA",
            image: "borgeby.png",
            price: 2590,
            color: "Birch veneer"
        },
        {
            id: 109,
            name: "BORGEBY",
            description: "BORGEBY storage table has an elegant, simple and stylish design with a harmonious and balanced expression. The rounded airy shape, smooth surface and natural material make the table suitable for many different living situations and interior styles.",
            stock: 16,
            category: "Desk",
            room: "Living room",
            brand: "IKEA",
            image: "borgeby_b.png",
            price: 2590,
            color: "Black"
        },
        {
            id: 110,
            name: "VIMLE",
            description: "This soft sofa will have a long life since the seat cushions are filled with high resilience foam that gives good support for your body and quickly regains its original shape when you get up.",
            stock: 4,
            category: "Sofa",
            room: "Living room",
            brand: "IKEA",
            image: "vimle.png",
            price: 25950,
            color: "Beige"
        },
        {
            id: 111,
            name: "MALM",
            description: "This versatile bed frame will look great with your choice of textiles and bedroom furniture. You can sit up comfortably in bed thanks to the high headboard – just prop some pillows behind your back and you will have a comfortable place to read or watch TV.",
            stock: 9,
            category: "Bed",
            room: "Bedroom",
            brand: "IKEA",
            image: "malm.png",
            price: 9990,
            color: "White"
        },
        {
            id: 112,
            name: "HEMNES",
            description: "The large drawers have space for extra duvets, pillows, linens or other things you need to store, but want to have close at hand.",
            stock: 12,
            category: "Bed",
            room: "Bedroom",
            brand: "IKEA",
            image: "hemnes.png",
            price: 20970,
            color: "White"
        }
        // Add more products following the same structure
    ];

    // Function to generate HTML for each product
    function generateProductHTML(product) {
        return `
            <div class="products">
                <img src="${product.image}">
                <div class="products_des">
                    <h2>${product.name}</h2>
                    <h3>(${product.brand})</h3>
                    <h2>${product.price} THB</h2>
                </div>
            </div>
        `;
    }

    // Function to display products on the page
    function displayProducts() {
        // Clear existing products
        productContainer.innerHTML = '';

        // Generate HTML for each product and append to the container
        products.forEach(product => {
            const productHTML = generateProductHTML(product);
            productContainer.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    // Display products when the page loads initially
    displayProducts();
});
