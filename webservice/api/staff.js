const database = require("../model/furnihub_db.js");
const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

module.exports = router

router.route("/")
    .get((req, res, next) => {
        console.log("returning all staff");
        database.query('SELECT * FROM admin', function (error, results) {
            if (error) 
                throw error;

            return res.send({ 
                error: false, 
                data: results, 
                message: 'Staff list.' 
            });
        });
    })