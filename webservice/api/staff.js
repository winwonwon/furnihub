const database = require("../model/furnihub_db.js");
const express = require('express');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Authenticate login credentials
function login(username, password, callback) {
    const query = `
        SELECT * FROM admin 
        WHERE 
            ACCOUNT_USERNAME=\"${username}\" AND
            ACCOUNT_PASSWORD=\"${password}\"    
    `

    // Check if username and password match
    database.query(query, (err, results) => {
        if (err)
            throw err;

        callback(results)
    })
}

// Handling GET and POST requests for '/api/staff' endpoint
router.route("/")
    /*
        Testing get all staffs
        method: get
        1. URL: http://localhost:8085/api/staff
        2. URL: http://localhost:8085/api/staff
    */
    .get((req, res, next) => {
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
    /*
        Testing login
        method: post
        URL: http://localhost:8085/api/staff
        body: raw JSON
        1. {
            "username": "p104",
            "password": "p080947"
        }
        2. {
            "username": "HH",
            "password": "WWW"
        }
    */
    .post((req, res, next) => {
        // Verifying login credentials
        login(req.body.username, req.body.password, (result) => {
            const isSuccess = (result.length == 1)
            if (isSuccess) {
                res.status(200).send("success")
                console.log(`Admin ${result[0].ACCOUNT_USERNAME} has logged in.`)
            } else {
                res.status(502).send("WHO ARE YOU DUH?")
            }
        })
    })

module.exports = router
