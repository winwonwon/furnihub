const express = require("express");
const path    = require("path")
const dotenv  = require("dotenv");
dotenv.config()

const app = express();
const router = express.Router();

app.use("/", router);
app.use("/", express.static(path.join(__dirname, "public")))

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "homepage", "homepage.html"))
})

router.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "products", "products.html"))
})

router.get("/detail-products", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "detail_products", "detail_products.html"))
})

router.get("/about-us", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "AboutUs.html"))
})

router.get("/browse", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "browse.html"))
})

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"))
})

router.get("/mycart", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "mycart.html"))
})

router.get("/product-man", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "productman.html"))
})

router.get("/user-man", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "userman.html"))
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
});