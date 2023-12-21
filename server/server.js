const express = require("express")
const app = express();
const db = require("./db");
const router = require("./router");
const bodyparser = require("body-parser");
const cors = require("cors")


app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json())
app.use("/api",router)


app.listen(3200, () => {
    console.log("Listening on port 3200");
});