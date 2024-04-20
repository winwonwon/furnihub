const database = require("../model/furnihub_db.js");
const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/")
    /*
        Get all products
        method: get
        URL: http://localhost:8085/api/products
        body: raw JSON
        1. {}
        2. {}
    */
    .get((req, res, next) => {
        console.log("returning all products");
        database.query('SELECT * FROM product', function (error, results) {
            if (error)
                throw error;

            return res.send({
                error: false,
                data: results,
                message: 'Product list.'
            });
        });
    })
    /*
        Testing Insert a new product
        method: post
        URL: http://localhost:8085/api/products
        body: raw JSON
        1. {
            "product": {
                PRODUCT_ID: 200,
                PRODUCT_NAME: Luxury Chair,
                PRODUCT_DESCRIPTION: Popular in Norway,
                PRODUCT_CATEGORY: Chair,
                PRODUCT_ROOM: Living Room,
                PRODUCT_BRAND: Koncept,
                PRODUCT_QUANTITY: 25,
                PRODUCT_PRICE: 500,
                PRODUCT_COLOR: Red,
                PRODUCT_PICTURE1: "",
                PRODUCT_PICTURE2: "",
                PRODUCT_PICTURE3: "",
                PRODUCT_PICTURE4: ""
            }
        }
        2. {
            "product": {
                "PRODUCT_ID": 500,
                "PRODUCT_NAME": "Royal Comfort Armchair",
                "PRODUCT_DESCRIPTION": "Indulge in luxury with our Royal Comfort Armchair. Crafted with premium materials and exquisite attention to detail, this armchair offers unparalleled comfort and sophistication. Its classic design adds an elegant touch to any living room.",
                "PRODUCT_CATEGORY": "Furniture",
                "PRODUCT_ROOM": "Living Room",
                "PRODUCT_BRAND": "Index Livingmall",
                "PRODUCT_QUANTITY": 50,
                "PRODUCT_PRICE": 999.99,
                "PRODUCT_COLOR": "Deep Burgundy",
                "PRODUCT_PICTURE1": "https://example.com/armchair_burgundy_1.jpg",
                "PRODUCT_PICTURE2": "https://example.com/armchair_burgundy_2.jpg",
                "PRODUCT_PICTURE3": "https://example.com/armchair_burgundy_3.jpg",
                "PRODUCT_PICTURE4": "https://example.com/armchair_burgundy_4.jpg"
            }
        }
    */
    .post((req, res, next) => {
        console.log("Inserting new product!")
        let product = req.body.product;

        if (!product) {
            return res.status(400).send({ error: true, message: 'Please provide product information' });
        }

        database.query("INSERT INTO product SET ?", product, function (error, results) {
            if (error)
                throw error;

            return res.send({ error: false, data: results.affectedRows, message: 'New product has been created successfully.', product });
        });
    })

router.route("/:id")
    /*
        Get product by ID
        method: get
        1. URL: http://localhost:8085/api/products/123
        2. URL: http://localhost:8085/api/products/321
        body: raw JSON
        1. {}
    */
    .get((req, res, next) => {
        let productId = req.params.id;
        console.log(`returning product by id ${productId}`)

        if (!productId) {
            return res.status(400).send({ error: true, message: 'Please provide product ID' });
        }

        database.query("SELECT * FROM product WHERE PRODUCT_ID = ?", productId, function (error, results) {
            if (error)
                throw error;

            if (results.length > 0)
                return res.send({ error: false, data: results[0], message: 'Product retrieved' });
            else
                return res.send({ error: false, message: 'Product not found' });
        });
    })
    /*
        Update product by ID
        method: put
        URL: http://localhost:8085/api/products/123
        body: raw JSON
        1. {
            "product": {
                "PRODUCT_ID": 123,
                "PRODUCT_NAME": "Updated Product Name",
                "PRODUCT_DESCRIPTION": "Updated product description"
            }
        }
        2. {
            "product": {
                "PRODUCT_ID": 333,
                "PRODUCT_NAME": "Updated Product Name",
                "PRODUCT_DESCRIPTION": "Updated product description",
                "PRODUCT_BRAND": "Index Livingmall"
            }
        }
    */
    .put((req, res, next) => {
        console.log("Updating product")
        let productId = req.params.id;
        let product = req.body.product;

        if (!product) {
            return res.status(400).send({ error: true, message: 'Please provide product information' });
        }

        database.query("UPDATE product SET ? WHERE PRODUCT_ID = ?", [product, productId], function (error, results) {
            if (error)
                throw error;

            return res.send({ error: false, data: results.affectedRows, message: 'Product has been updated successfully.' });
        });
    })
    /*
        Delete product by ID
        method: delete
        URL: http://localhost:8085/api/products/123
        body: raw JSON
        {}
    */
    .delete((req, res, next) => {
        console.log("DELETING A PRODUCT");
        let productId = req.params.id;

        if (!productId) {
            return res.status(400).send({ error: true, message: 'Please provide product ID' });
        }

        database.query("DELETE FROM product WHERE PRODUCT_ID = ?", productId, function (error, results) {
            if (error)
                throw error;

            return res.send({ error: false, data: results.affectedRows, message: 'Product has been deleted successfully.' });
        });
    })

/*
    Search products
    method: post
    URL: http://localhost:8085/api/products/search
    body: raw JSON
    1. {
        "queryString": "chair"
    }
    2. {
        "queryString": "desk"
    }
*/
router.post("/search", (req, res) => {
    const queryString = req.body.queryString
    const query = `SELECT * FROM product WHERE PRODUCT_NAME LIKE \"%${queryString}%\"`
    database.query(query, (err, results) => {
        if (err)
            throw err;

        res.send({ error: false, data: results })
    })
})

/*
    Advanced search products
    method: post
    URL: http://localhost:8085/api/products/adv-search
    body: raw JSON
    1. {
        "queryString": "chair",
        "category": "Furniture",
        "room": "Living Room",
        "brand": "IKEA",
        "price": "1000" 
    }
    2. {
        "queryString": "Bed",
        "category": "Bed",
        "room": "Bedroom",
        "brand": "Koncept",
        "price": "" 
    }
*/
router.post("/adv-search", (req, res) => {
    const query = `
        SELECT * FROM product 
        WHERE 
            PRODUCT_NAME LIKE \"%${req.body.queryString}%\" AND 
            PRODUCT_CATEGORY LIKE \"%${req.body.category}%\" AND
            PRODUCT_ROOM LIKE \"%${req.body.room}%\" AND
            PRODUCT_BRAND LIKE \"%${req.body.brand}%\" AND   
            PRODUCT_PRICE LIKE \"%${req.body.price}%\" 
    `

    database.query(query, (err, results) => {
        if (err)
            throw err;

        res.send({ error: false, data: results })
    })
})

module.exports = router