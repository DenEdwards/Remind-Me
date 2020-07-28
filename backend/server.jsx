const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const noteRouter = require("./routes/notes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

//Cors middle ware
app.use(cors());
//allows us to parse
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
mongoose.connection.once("open", ()=>{
    console.log("MongooseDB connection opened successfully.");
});

app.use("/", noteRouter);

app.listen(port, () => {
    console.log("Listening on port 3001...");
});
