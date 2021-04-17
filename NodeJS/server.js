const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/usersRoute");
require("./config/db");
const cors = require('cors');


const app = express();

const PORT = 5500;


app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
