const express = require("express");
const path    = require("path")
const dotenv  = require("dotenv");
const http    = require("http")
const querystring = require("querystring")
const session = require("express-session")
dotenv.config()

const app = express();
app.use(session({
    secret: "bobo",
    resave: true,
    saveUninitialized: true,
    maxAge: 3600
}))


const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
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

router.get("/admin", (req, res) => {
    if (req.session.isAdmin) {
        res.redirect("/admin-landing")
        return
    }

    res.sendFile(path.join(__dirname, "public", "loginstaff.html"))
})

router.post("/admin", (req, res) => {
    const data = JSON.stringify({
        username: req.body.username,
        password: req.body.password
    })
    const request = http.request({
        host: "localhost",
        port: 8085,
        path: "/api/staff",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(data)
        },
    }, (http_response) => {
        let responseData = '';
        http_response.setEncoding("utf-8")
        http_response.on("data", (chunk) => {
            responseData += chunk
        })

        http_response.on("end", () => {
            if (responseData == "success") {
                req.session.isAdmin = true
                res.redirect("/admin-landing")
            } else {
                res.status(502).redirect("/admin")
            }
        })
    })

    request.write(data);
    request.end()

})

router.get("/admin-landing", (req, res) => {
    console.log(req.session)
    if (!req.session.isAdmin) {
        res.redirect("/admin")
        return
    }

    res.sendFile(path.join(__dirname, "public", "stafflandingpage.html"))
})

router.get("/mycart", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "mycart.html"))
})

router.get("/product-man", (req, res) => {
    if (!req.session.isAdmin) {
        res.redirect("/admin")
        return
    }

    res.sendFile(path.join(__dirname, "public", "productman.html"))
})

router.get("/user-man", (req, res) => {
    if (!req.session.isAdmin) {
        res.redirect("/admin")
        return
    }

    res.sendFile(path.join(__dirname, "public", "userman.html"))
})

router.get("/account", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "myAccount.html"))
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
});