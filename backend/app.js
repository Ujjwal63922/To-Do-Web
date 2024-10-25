const express = require("express");
const app=express();
require("dotenv").config();
require("./connection/connection.js")

const cors=require("cors");
const UserAPI=require("./routes/User")
const TodoAPI=require("./routes/Todo")
app.use(cors());
app.use(express.json());




app.use("/api/v1",UserAPI);
app.use("/api/v2",TodoAPI);

app.use("/",(req,res)=>{
    res.send("from backend");
});

const PORT=1000;
app.listen(PORT,()=>{
    console.log("server started");
});