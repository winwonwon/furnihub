const database = require("../model/furnihub_db.js");
const express = require('express');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function login(username, password, callback) {
    const query = `
        SELECT * FROM admin 
        WHERE 
            ACCOUNT_USERNAME=\"${username}\" AND
            ACCOUNT_PASSWORD=\"${password}\"    
    `
    database.query(query, (err, results) => {
        if (err)
            throw err;

        callback(results)
    })
}

router.route("/")
    .get((req, res, next) => {
        console.log(req.session, req.sessionID)
        if (!req.session.isAdmin) 
            return res.status(502).send("Unauthorized")

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
    .post((req, res, next) => {
        login(req.body.username, req.body.password, (result) => {
            const isSuccess = result.length == 1
            if (isSuccess) {
                req.session.isAdmin = true
                res.status(200).send("success")
                console.log(`Admin ${result[0].ACCOUNT_USERNAME} has logged in.`)
            } else {
                res.status(502).send("WHO ARE YOU DUH?")
            }
        })
    })

module.exports = router
