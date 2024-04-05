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

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
});