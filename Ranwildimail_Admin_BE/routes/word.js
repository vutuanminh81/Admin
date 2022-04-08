const express  = require('express');
const cors = require('cors');
// const Word = require('../config');
const app = express();

var router = express.Router();
app.use(express.json());
app.use(cors());


app.post("/addWord",async(req,res)=>{
    const data = req.body;
    console.log("data.........",data);
    // await Word.add(data);
    res.send("Add success");
});

module.exports = router;