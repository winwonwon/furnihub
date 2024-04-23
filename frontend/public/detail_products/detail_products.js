document.addEventListener("DOMContentLoaded", function () {
    // find the back icon element
    console.log("Detail product loaded")
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

    // get the product ID from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // find the product based on the ID
    // const product = products.find(p => p.id === productId);

    fetch(`http://localhost:8080/detail-products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
            const product = data.data
            document.getElementById("productID").textContent = product.PRODUCT_ID + " / " + product.PRODUCT_ROOM;
            document.getElementById("productName").textContent = product.PRODUCT_NAME;
            document.getElementById("productBrand").textContent = "(" + product.PRODUCT_BRAND + ")";
            document.getElementById("productPrice").textContent = product.PRODUCT_PRICE + " THB";
            document.getElementById("productColor").textContent = "Color: " + product.PRODUCT_COLOR;
            document.getElementById("productDescription").textContent = product.PRODUCT_DESCRIPTION;
    
            // update main image
            document.getElementById("mainImage").src = product.PRODUCT_PICTURE1;
    
            // populate small images
            const smallImagesContainer = document.querySelector('.small-images');
            const images = [product.PRODUCT_PICTURE1, product.PRODUCT_PICTURE2, product.PRODUCT_PICTURE3, product.PRODUCT_PICTURE4]
            images.forEach(image => {
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
        })
        .catch((err) => {
            console.error(err);
        })

    // populate product details
    // if (product) {
        // document.getElementById("productID").textContent = product.id + " / " + product.room;
        // document.getElementById("productName").textContent = product.name;
        // document.getElementById("productBrand").textContent = "(" + product.brand + ")";
        // document.getElementById("productPrice").textContent = product.price + " THB";
        // document.getElementById("productColor").textContent = "Color: " + product.color;
        // document.getElementById("productDescription").textContent = product.description;

        // // update main image
        // document.getElementById("mainImage").src = product.images[0];

        // // populate small images
        // const smallImagesContainer = document.querySelector('.small-images');
        // product.images.forEach(image => {
        //     const img = document.createElement('img');
        //     img.src = image;
        //     img.addEventListener('click', function () {
        //         document.getElementById("mainImage").src = image;
        //     });
        //     const imgContainer = document.createElement('div');
        //     imgContainer.classList.add('img_product');
        //     imgContainer.appendChild(img);
        //     smallImagesContainer.appendChild(imgContainer);
        // });
    // } else {
    //     // if product not found, redirect to browse page
    //     // window.location.href = "/browse";
    // }
});