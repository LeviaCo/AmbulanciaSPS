const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(require("./routes/app.js"));
app.use(express.static(path.join(__dirname, "./")))

app.listen(3500, () => {
    console.log("Server on port 3500: http://localhost:3500/");
});
