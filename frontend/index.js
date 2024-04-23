const express = require("express");
const path    = require("path");
const dotenv  = require("dotenv");
const axios    = require("axios");
const FormData = require("form-data")
const session = require("express-session");
const multer = require("multer")
dotenv.config()

async function sendJsonRequest(port, path, method, body) {
    try {
        const response = await axios({
            method: method,
            url: `http://localhost:${port}${path}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: body
        });

        return response.data;
    } catch (error) {
        // Handle error
        console.error("Error:", error.response.data);
        throw error;
    }
}

const app = express();
app.use(session({
    secret: "bobo",
    resave: true,
    saveUninitialized: true,
    maxAge: 3600
}))

const upload = multer()
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use("/", express.static(path.join(__dirname, "public")))

const auth = (req, res, next) => {
    if (!req.session.isAdmin) {
        res.redirect("/admin")
        return
    }

    next()
}

router.use("/users", auth)

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "homepage", "homepage.html"))
})

router.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "products", "products.html"))
})

router.get("/users", (req, res) => {
    sendJsonRequest(8085, "/api/users", "GET")
    .then((response) => res.send(response))
})

router.put("/users/:id", (req, res) => {
    sendJsonRequest(8085, "/api/users/"+req.params.id, "PUT", req.body)
    .then((response) => res.send(response))
})

router.delete("/users/:id", (req, res) => {
    sendJsonRequest(8085, "/api/users/"+req.params.id, "DELETE")
    .then((response) => res.send(response))
})

router.post("/users", (req, res) => {
    sendJsonRequest(8085, "/api/users", "POST", req.body)
    .then((response) => res.send(response))
})

router.post("/products-advsearch", (req, res) => {
    const data = JSON.stringify({
        queryString: req.body.queryString,
        category: req.body.category,
        room: req.body.room,
        brand: req.body.brand,
        price: req.body.price
    })

    sendJsonRequest(8085, "/api/products/adv-search", "POST", data)
    .then((response) => res.send(response))
})

router.post("/products-search", (req, res) => {
    const data = JSON.stringify({
        queryString: req.body.queryString
    })

    sendJsonRequest(8085, "/api/products/search", "POST", data)
    .then((response) => res.send(response))
})

router.delete("/delete-products/:id", auth, (req, res) => {
    sendJsonRequest(8085, "/api/products/"+req.params.id, "DELETE")
    .then((response) => res.send(response))
})

router.get("/get-products", (req, res) => {
    sendJsonRequest(8085, "/api/products", "GET")
    .then((response) => res.send(response))
})

router.put("/update-products/:id", [upload.any(), auth], (req, res) => {
    const formData = new FormData();
    req.files.forEach(file => {
        formData.append(file.fieldname, file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype
        });
    });

    // Append other data to the FormData object if needed
    Object.keys(req.body).forEach(key => {
        formData.append(key, req.body[key]);
    });

    axios({
        method: "PUT",
        url: `http://localhost:8085/api/products/${req.params.id}`,
        headers: {
            ...formData.getHeaders() // Include FormData headers
        },
        data: formData
    })
    .then((response) => {
        if (!response.error) {
            res.send(response.data)
        } else {
            res.sendStatus(400)
        }

    })
    .catch((e) => {
        console.error(e)
    })
})

router.post("/insert-products", [upload.any(), auth], async (req, res) => {
    try {
        // Re-construct formdata to be sent to another endpoint again.
        const formData = new FormData();
        req.files.forEach(file => {
            formData.append(file.fieldname, file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype
            });
        });
  
        // Append other data 
        Object.keys(req.body).forEach(key => {
            formData.append(key, req.body[key]);
        });

        axios({
            method: "POST",
            url: `http://localhost:8085/api/products`,
            headers: {
                ...formData.getHeaders() // Include FormData headers
            },
            data: formData
        })
        .then((response) => {
            if (!response.error) {
                res.send(response.data)
            } else {
                res.sendStatus(400)
            }
        })
        .catch((e) => {
            console.error(e)
        })

    }
    catch (e) {
        console.log(e)
    }
})

router.get("/detail-products", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "detail_products", "detail_products.html"))
})

router.get("/detail-products/:id", (req, res) => {
    const id = req.params.id
    sendJsonRequest(8085, `/api/products/${id}`, "GET")
    .then((response) => res.send(response))
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
    sendJsonRequest(8085, "/api/staff", "POST", data)
    .then((response) => {
        if (response == "success") {
            req.session.isAdmin = true
            res.redirect("/admin-landing")
        } else {
            res.status(502).redirect("/admin")
        }
    })
})

router.get("/admin-landing", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "stafflandingpage.html"))
})

router.get("/mycart", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "mycart.html"))
})

router.get("/product-man", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "productman.html"))
})

router.get("/user-man", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "userman.html"))
})

router.get("/account", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "myAccount.html"))
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
});