const product = require("./product.js")
const user = require("./users.js")
const staff = require("./staff.js")

const express = require('express')
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use("/products", product);
router.use("/users", user);
router.use("/staff", staff);

module.exports = router