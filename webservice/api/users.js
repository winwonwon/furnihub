const database = require("../model/furnihub_db.js");

const express = require('express');
const router = express.Router();

// Middleware to parse JSON and URL-encoded bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// Route for '/api/users'
router.route("/")
    /*
        Testing get all users
        method: post
        1. URL: http://localhost:8085/api/users
        2. URL: http://localhost:8085/api/users
    */
    .get((req, res, next) => {
        database.query('SELECT * FROM USER', function (error, results) {
            if (error) {
                console.error('Error fetching users:', error);
                return res.status(500).send({ error: true, message: 'Failed to fetch users.' });
            }
            return res.send({ error: false, data: results, message: 'User list.' });
        });
    })
    /*
        Testing insert a new user
        method: post
        URL: http://localhost:8085/api/users
        body: raw JSON
        1. {
            "user": {
                "ACCOUNT_ID": "028",
                "ACCOUNT_FNAME": "Somporn",
                "ACCOUNT_LNAME": "Yeyeye",
                "ACCOUNT_PNUMBER": "0001112222",
                "ACCOUNT_EMAIL": "mrsomporn@gmail.com",
                "ACCOUNT_USERNAME": "sompornzaza",
                "ACCOUNT_PASSWORD": "somsomsom",
                "ACCOUNT_LAST_LOGIN": "2023-01-22",
                "ACCOUNT_CREATION_DATE": "2023-01-20"
            }
        }
        2. {
            "user": {
                "ACCOUNT_ID": "0289",
                "ACCOUNT_FNAME": "Simpson",
                "ACCOUNT_LNAME": "Yeyeye",
                "ACCOUNT_PNUMBER": "1112223333",
                "ACCOUNT_EMAIL": "mrlhomporn@gmail.com",
                "ACCOUNT_USERNAME": "pompornzaza",
                "ACCOUNT_PASSWORD": "somsomsom",
                "ACCOUNT_LAST_LOGIN": "2023-01-22",
                "ACCOUNT_CREATION_DATE": "2023-01-20"
            }
        }
    */
    .post((req, res, next) => {
        let user = req.body.user;
        if (!user) {
            return res.status(400).send({ error: true, message: 'Please provide user information' });
        }

        database.query("INSERT INTO ACCOUNT SET ?", user, function (error, accountResults) {
            if (error) {
                console.error('Error inserting new account:', error);
                return res.status(500).send({ error: true, message: 'Failed to create new user.' });
            }

            database.query("INSERT INTO USER SET ?", user, function (error, userResults) {
                if (error) {
                    console.error('Error inserting new user:', error);
                    return res.status(500).send({ error: true, message: 'Failed to create new user.' });
                }

                return res.status(201).send({ error: false, data: userResults.affectedRows, message: 'New user has been created successfully.', user });
            });
        });
    });

// Route for '/api/users/:id'
router.route("/:id")
    /*
        Testing get user by id
        method: get
        1. URL: http://localhost:8085/api/users/006
        2. URL: http://localhost:8085/api/users/007
    */
    .get((req, res, next) => {
        let userId = req.params.id;
        if (!userId) {
            return res.status(400).send({ error: true, message: 'Please provide user ID' });
        }

        database.query("SELECT * FROM USER WHERE ACCOUNT_ID = ?", userId, function (error, results) {
            if (error) {
                console.error('Error fetching user by ID:', error);
                return res.status(500).send({ error: true, message: 'Failed to fetch user.' });
            }

            if (results.length > 0) {
                return res.send({ error: false, data: results[0], message: 'User retrieved' });
            } else {
                return res.status(404).send({ error: true, message: 'User not found' });
            }
        });
    })
        /*
        Testing update user
        method: put
        URL: http://localhost:8085/api/users/006
        body: raw JSON
        1. {
            "user": {
                "ACCOUNT_FNAME": "Somporn",
                "ACCOUNT_LNAME": "Yeyeye",
                "ACCOUNT_PNUMBER": "0001112222",
                "ACCOUNT_EMAIL": "mrsomporn@gmail.com",
                "ACCOUNT_USERNAME": "sompornzaza",
                "ACCOUNT_PASSWORD": "somsomsom",
                "ACCOUNT_LAST_LOGIN": "2023-01-22",
                "ACCOUNT_CREATION_DATE": "2023-01-20"
            }
        }
        2. {
            "user": {
                "ACCOUNT_FNAME": "Simpson",
                "ACCOUNT_LNAME": "Yeyeye",
                "ACCOUNT_PNUMBER": "1112223333",
                "ACCOUNT_EMAIL": "mrlhomporn@gmail.com",
                "ACCOUNT_USERNAME": "pompornzaza",
                "ACCOUNT_PASSWORD": "somsomsom",
                "ACCOUNT_LAST_LOGIN": "2023-01-22",
                "ACCOUNT_CREATION_DATE": "2023-01-20"
            }
        }
    */
    .put((req, res, next) => {
        let userId = req.params.id;
        let user = req.body.user;
        if (!user) {
            return res.status(400).send({ error: true, message: 'Please provide user information' });
        }

        database.query("UPDATE ACCOUNT SET ? WHERE ACCOUNT_ID = ?", [user, userId], function (error, accountResults) {
            if (error) {
                console.error('Error updating account:', error);
                return res.status(500).send({ error: true, message: 'Failed to update user.' });
            }

            database.query("UPDATE USER SET ? WHERE ACCOUNT_ID = ?", [user, userId], function (error, userResults) {
                if (error) {
                    console.error('Error updating user:', error);
                    return res.status(500).send({ error: true, message: 'Failed to update user.' });
                }

                return res.send({ error: false, data: userResults.affectedRows, message: 'User has been updated successfully.' });
            });
        });
    })
    /*
        Delete product by ID
        method: delete
        1. URL: http://localhost:8085/api/users/006
        2. URL: http://localhost:8085/api/users/007
    */
    .delete((req, res, next) => {
        let userId = req.params.id;
        if (!userId) {
            return res.status(400).send({ error: true, message: 'Please provide user ID' });
        }

        database.query("DELETE FROM USER WHERE ACCOUNT_ID = ?", userId, function (error, results) {
            if (error) {
                console.error('Error deleting user:', error);
                return res.status(500).send({ error: true, message: 'Failed to delete user.' });
            }

            database.query("DELETE FROM ACCOUNT WHERE ACCOUNT_ID = ?", userId, function (error, accountResults) {
                if (error) {
                    console.error('Error deleting account:', error);
                    return res.status(500).send({ error: true, message: 'Failed to delete user account.' });
                }

                return res.send({ error: false, data: results.affectedRows, message: 'User has been deleted successfully.' });
            });
        });
    });

module.exports = router;
