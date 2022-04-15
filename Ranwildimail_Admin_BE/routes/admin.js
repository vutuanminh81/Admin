var express = require('express');
var router = express.Router();
const cors = require("cors");
const db = require("../config");

var router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());

const AdminDB = db.collection("Admin");

router.get("/count", async (req, res) => {
    const data = await AdminDB.get();
    const arrayData = [];
    if (data.empty) {
        res.status(404).send("Nothing in list");
    } else {
        
        data.forEach(element => {
        arrayData.push(element.data().Admin_Id);

        });
    }
    res.status(200).json(arrayData.length);
});

module.exports = router;