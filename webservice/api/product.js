const database = require("../model/furnihub_db.js");

const multer = require("multer")
const axios = require("axios")
const fs = require("fs")
const path = require("path")
const FormData = require("form-data")
const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Function to upload image using Gyazo API
// https://gyazo.com/api/docs
async function uploadImage(image, cb) {
    let data = new FormData();
    let imagePath = path.join(__dirname, "..", "temp", image.originalname)
    data.append('access_token', 'Qb1dF3_BNlP2P9Kg59Tf8zhnp07EIhfuPapTna3lUGs');
    data.append('imagedata', fs.createReadStream(imagePath));
    data.append('app', 'Furnihub');

    // Making a POST request to Gyazo API for image upload
    return await axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://upload.gyazo.com/api/upload',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: data
    }).then((response) => {
        fs.rmSync(imagePath, {force: true})         // Deleting temporary image file after uploaded
        return response.data
    }).catch((error) => {
        console.error(error);
    });
}

// Setting up multer for temporary storage of uploaded files
// https://stackoverflow.com/questions/51483507/how-to-save-and-show-the-picture-saved-using-multer-package-in-nodejs
const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "temp"),
    filename: (req, file, cb) => cb(null, file.originalname)
})
const upload = multer({
    storage: tempStorage
})

// Handling GET and POST requests for '/api/products' endpoint
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
        2. {
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
    */
    .post(upload.any(), async (req, res, next) => {
        const product = req.body;
        if (!product) 
            return res.status(400).send({ error: true, message: 'Please provide product information' });

        // If there's an image attached with request
        if (req.files && req.files.length > 0) {
            const image = req.files[0]
            const uploadResult = await uploadImage(image)
            if (uploadResult && uploadResult.url) {
                product.PRODUCT_PICTURE1 = uploadResult.url
            } else {
                console.error("Error uploading an image.")
            }
        }

        database.query("INSERT INTO product SET ?", product, function (error, results) {
            if (error)
                throw error;

            product.PRODUCT_ID = results.insertId           // PRODUCT_ID is AUTO_INCREMENT
            return res.send({ error: false, data: results.affectedRows, message: 'New product has been created successfully.', product });
        });
    })

// Handling GET, PUT, and DELETE requests for '/api/products/:id' endpoint
router.route("/:id")
    /*
        Get product by ID
        method: get
        1. URL: http://localhost:8085/api/products/110
        2. URL: http://localhost:8085/api/products/111
    */
    .get((req, res, next) => {
        let productId = req.params.id;
        if (!productId) 
            return res.status(400).send({ error: true, message: 'Please provide product ID' });

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
        URL: http://localhost:8085/api/products/110
        body: raw JSON
        1. {
            "PRODUCT_ID": 123,
            "PRODUCT_NAME": "Updated Product Name",
            "PRODUCT_DESCRIPTION": "Updated product description"
        }
        2. {
            "PRODUCT_ID": 333,
            "PRODUCT_NAME": "Updated Product Name",
            "PRODUCT_DESCRIPTION": "Updated product description",
            "PRODUCT_BRAND": "Index Livingmall"
        }
    */
    .put(upload.any(), async (req, res, next) => {
        let productId = req.params.id;
        let product = req.body;
        if (!product) 
            return res.status(400).send({ error: true, message: 'Please provide product information' });

        // If there's an image attached with request
        if (req.files && req.files.length > 0) {
            const image = req.files[0]
            const uploadResult = await uploadImage(image)
            if (uploadResult && uploadResult.url) {
                product.PRODUCT_PICTURE1 = uploadResult.url
            } else {
                console.error("Error uploading an image.")
            }
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
        1. URL: http://localhost:8085/api/products/123
        2. URL: http://localhost:8085/api/products/110
    */
    .delete((req, res, next) => {
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
        "queryString": "linea"
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
        "queryString": "",
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