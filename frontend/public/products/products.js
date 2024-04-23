// function to generate HTML for each product
function generateProductHTML(product) {
    return `
        <div class="products" data-id="${product.PRODUCT_ID}">
            <img src="${product.PRODUCT_PICTURE1}">
            <div class="products_des">
                <h2>${product.PRODUCT_NAME}</h2>
                <h3>(${product.PRODUCT_BRAND})</h3>
                <h2>${product.PRODUCT_PRICE} THB</h2>
            </div>
        </div>
    `;
}

// function to display products on the page
function displayProducts(products) {
    const productContainer = document.querySelector(".product");
    // clear existing products
    productContainer.innerHTML = '';

    // generate HTML for each product and append to the container
    products.forEach(product => {
        const productHTML = generateProductHTML(product);
        productContainer.insertAdjacentHTML('beforeend', productHTML);
    });

    // add event listener to each product item
    const productItems = document.querySelectorAll('.products');
    productItems.forEach(item => {
        item.addEventListener('click', function () {
            const productId = parseInt(item.getAttribute('data-id'));
            // redirect to detail page passing product id
            window.location.href = `/detail-products?id=${productId}`;
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var menuIcon = document.getElementById("menuIcon");
    var navigation = document.getElementById("navigation");
    var closeIcon = document.getElementById("closeIcon");

    // toggle nav menu when menu icon is clicked
    menuIcon.addEventListener("click", function () {
        navigation.classList.toggle("active");
    });

    // close nav menu when close icon is clicked
    closeIcon.addEventListener("click", function () {
        navigation.classList.remove("active");
    });


    // function to handle clicking the back icon
    function handleBackClick() {
        // check if the referrer URL indicates the user came from the browse page
        const referrer = document.referrer;
        if (referrer.includes('/browse')) {
            // redirect to the browse page
            window.location.href = '/browse';
        } else {
            // redirect to the homepage
            window.location.href = '/';
        }
    }

    // add event listener for the back icon
    document.getElementById("backIcon").addEventListener("click", handleBackClick);

    async function showSearchResults(searchString) {
        try {
            const response = await fetch('http://localhost:8080/products-search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    queryString: searchString
                })
            });

            if (response.ok) {
                const data = await response.json();
                displayProducts(data.data)
            } else {
                console.error('Failed to fetch search results');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function showAdvancedSearchResults(searchString, brand, room, category, price) {
        try {
            const response = await fetch('http://localhost:8080/products-advsearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    queryString: searchString,
                    category: category,
                    room: room,
                    brand: brand,
                    price: price
                })
            });

            if (response.ok) {
                const data = await response.json();
                displayProducts(data.data)
            } else {
                console.error('Failed to fetch adv-search results');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const searchString = urlParams.get('searchString');
    if (urlParams.size > 1) {
        // advanced search
        const brand = urlParams.get("brand")
        const room = urlParams.get("room")
        const category = urlParams.get("category")
        const price = urlParams.get("price")
        showAdvancedSearchResults(searchString, brand, room, category, price)
    } else {
        showSearchResults(searchString || '')
    }
});