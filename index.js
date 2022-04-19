const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(3000, ()=> console.log("Serves is listening to port 3000"));