const express = require("express");
const app = express();
const cors = require("cors")

app.use(
    cors({
        origin: "http://localhost:3000",
    })
)


app.get("/data", (req, res) => {
    res.json();
});

app.listen(3000)