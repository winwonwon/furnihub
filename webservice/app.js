const database = require("./model/furnihub_db.js")
const router = require("./api/router.js")

const express = require('express')
const cors = require("cors")
const path = require('path')
const dotenv = require("dotenv")
const session = require("express-session")

const app = express();
app.use(cors({ 
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(session({
    secret: "bobo",
    resave: true,
    saveUninitialized: true,
    maxAge: 3600
}))
app.use("/api", router)
dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
});