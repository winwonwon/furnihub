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

    // add click event listener to the back icon
    backIcon.addEventListener("click", function () {
        // redirect to the browse page
        window.location.href = "/products";
    });

    // simulated data from SQL
    const products = [
        {
            id: 108,
            name: "BORGEBY",
            description: "BORGEBY storage table has an elegant, simple and stylish design with a harmonious and balanced expression. The rounded airy shape, smooth surface and natural material make the table suitable for many different living situations and interior styles.",
            stock: 53,
            category: "Desk",
            room: "Living room",
            brand: "IKEA",
            images: ["https://drive.google.com/thumbnail?id=1o-63BTaxmSOVdNvbGTeHSNEe0_tMrmhL",
                "https://drive.google.com/thumbnail?id=1aeVkjCThd3yCta7Rlndw4bdddj8jcoZx",
                "https://drive.google.com/thumbnail?id=1Yjuz2r6dWB2-sfDKI9mNAR7FyawMmee3",
                "https://drive.google.com/thumbnail?id=1uZIFvxzps8B_TXxBmmaUPQLzDla9LYdH"],
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
            images: [
                "https://drive.google.com/thumbnail?id=1iPsqIUjfTFIdPt5Q2Aj5-7zDXCkkEGZw",
                "https://drive.google.com/thumbnail?id=13y-HzrRZLq_yVvtZcXBxsUb3PIjk3LN4",
                "https://drive.google.com/thumbnail?id=1pcjv02mSx5EJGfwS9ar3cVsLAlazY3tg",
                "https://drive.google.com/thumbnail?id=1pyp_sGqXMtUW_vgKYVUaTZfel_IReyr4"
            ],
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

            images: ["https://drive.google.com/thumbnail?id=1WbN6OxvP-T6EPWfumFdDk_jDm7c5GmLB",
                "https://drive.google.com/thumbnail?id=1ZRU7naGFlsTLHi1dmD7uTJwLniG6foLh",
                "https://drive.google.com/thumbnail?id=1U21nT1-dxz0PQq5AWENJQiOOJTR8O88j",
                "https://drive.google.com/thumbnail?id=1sXCjQPTEHD1MAvxme9qNmbeZZTbrOX5e"],
            price: 25950,
            color: "Beige"
        },
        // add more products here
    ];

    // get the product ID from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // find the product based on the ID
    const product = products.find(p => p.id === productId);

    // populate product details
    if (product) {
        document.getElementById("productID").textContent = product.id + " / " + product.room;
        document.getElementById("productName").textContent = product.name;
        document.getElementById("productBrand").textContent = "(" + product.brand + ")";
        document.getElementById("productPrice").textContent = product.price + " THB";
        document.getElementById("productColor").textContent = "Color: " + product.color;
        document.getElementById("productDescription").textContent = product.description;

        // update main image
        document.getElementById("mainImage").src = product.images[0];

        // populate small images
        const smallImagesContainer = document.querySelector('.small-images');
        product.images.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            img.addEventListener('click', function () {
                document.getElementById("mainImage").src = image;
            });
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img_product');
            imgContainer.appendChild(img);
            smallImagesContainer.appendChild(imgContainer);
        });
    } else {
        // if product not found, redirect to browse page
        // window.location.href = "/browse";
    }
});