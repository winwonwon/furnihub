const express = require("express");
const dotenv = require("dotenv");
dotenv.config()

const app = express();
const router = express.Router();
app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
});