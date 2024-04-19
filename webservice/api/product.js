const database = require("../model/furnihub_db.js");
const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/")
    // Get all products
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
    // Insert a product
    .post((req, res, next) => {
        console.log("Inserting new product!")
        let product = req.body.product;

        if (!product) {
            return res.status(400).send({ error: true, message: 'Please provide product information' });
        }
    
        database.query("INSERT INTO product SET ?", product, function (error, results) {
            if (error) throw error;
            return res.send({ error: false, data: results.affectedRows, message: 'New product has been created successfully.', product});
        });
    })

router.route("/:id")
    // Get product by ID
    .get((req, res, next) => {
        let productId = req.params.id;
        console.log(`returning product by id ${productId}`)

        if (!productId) {
            return res.status(400).send({ error: true, message: 'Please provide product ID' });
        }
    
        database.query("SELECT * FROM product WHERE PRODUCT_ID = ?", productId, function (error, results) {
            if (error) throw error;
    
            if (results.length > 0)
                return res.send({ error: false, data: results[0], message: 'Product retrieved' });
            else
                return res.send({ error: false, message: 'Product not found' });
        });
    })
    // Update product by ID
    .put((req, res, next) => {
        console.log("Updating product")
        let productId = req.params.id;
        let product = req.body.product;
    
        if (!product) {
            return res.status(400).send({ error: true, message: 'Please provide product information' });
        }
    
        database.query("UPDATE product SET ? WHERE PRODUCT_ID = ?", [product, productId], function (error, results) {
            if (error) throw error;
            return res.send({ error: false, data: results.affectedRows, message: 'Product has been updated successfully.' });
        });
    })
    // Delete product by ID
    .delete((req, res, next) => {
        console.log("DELETING A PRODUCT");
        let productId = req.params.id;

        if (!productId) {
            return res.status(400).send({ error: true, message: 'Please provide product ID' });
        }
    
        database.query("DELETE FROM product WHERE PRODUCT_ID = ?", productId, function (error, results) {
            if (error) throw error;
            return res.send({ error: false, data: results.affectedRows, message: 'Product has been deleted successfully.' });
        });
    })
    
module.exports = router