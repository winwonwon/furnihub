const product = require("./product.js")

const express = require('express')
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use("/products", product);

module.exports = router