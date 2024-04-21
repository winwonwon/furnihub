const database = require("../model/furnihub_db.js");
const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

module.exports = router

router.route("/")
/*
        Get all user
        method: get
        URL: http://localhost:8085/api/users
        body: raw JSON
        1. {}
        2. {}
    */
    .get((req, res, next) => {
        console.log("returning all users");
        database.query('SELECT * FROM USER', function (error, results) {
            if (error) 
                throw error;

            return res.send({ 
                error: false, 
                data: results, 
                message: 'User list.' 
            });
        });
    })
    .post((req, res, next) => {
        console.log("Inserting new user!")
        let user = req.body.user;

        if (!user) {
            return res.status(400).send({ error: true, message: 'Please provide user information' });
        }

        database.query("INSERT INTO USER SET ?", user, function (error, results) {
            if (error)
                throw error;

            return res.send({ error: false, data: results.affectedRows, message: 'New user has been created successfully.', user });
        });
    }) 
    
router.route("/:id")
    .get((req, res, next) => {
        let userId = req.params.id;
        console.log(`returning user by id ${userId}`)

        if (!userId) {
            return res.status(400).send({ error: true, message: 'Please provide user ID' });
        }

        database.query("SELECT * FROM USER WHERE ACCOUNT_ID = ?", userId, function (error, results) {
            if (error)
                throw error;

            if (results.length > 0)
                return res.send({ error: false, data: results[0], message: 'user retrieved' });
            else
                return res.send({ error: false, message: 'user not found' });
        });
    })
    .put((req, res, next) => {
        console.log("Updating user")
        let userId = req.params.id;
        let user = req.body.user;

        if (!user) {
            return res.status(400).send({ error: true, message: 'Please provide user information' });
        }

        database.query("UPDATE USER SET ? WHERE ACCOUNT_ID = ?", [user, userId], function (error, results) {
            if (error)
                throw error;

            return res.send({ error: false, data: results.affectedRows, message: 'user has been updated successfully.' });
        });
    })
    .delete((req, res, next) => {
        console.log("DELETING A USER");
        let userId = req.params.id;

        if (!userId) {
            return res.status(400).send({ error: true, message: 'Please provide user ID' });
        }

        database.query("DELETE FROM USER WHERE ACCOUNT_ID = ?", userId, function (error, results) {
            if (error)
                throw error;

            return res.send({ error: false, data: results.affectedRows, message: 'User has been deleted successfully.' });
        });
    })
