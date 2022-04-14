var express = require('express');
var router = express.Router();
const cors = require("cors");
const db = require("../config");
const ReportModel = require("../Model/word_description");
const Des = require("../Model/word_description");

var router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());
const word_desDB = db.collection("Word_Description");

router.get("/getScanSearch", async (req, res) => {
    const data = await word_desDB.get();
    const arrayData = [];

    if (data.empty) {
        res.status(404).send("Nothing in list");
    } else {
        var sumscan = 0;
        var sumsearch = 0;
        data.forEach(element => {
            sumscan += element.data().num_Of_Scan;
            sumsearch += element.data().num_Of_Search;
        });
        arrayData.push({ name: "Scan", value: sumscan }, { name: "Search", value: sumsearch });
    }

    res.status(200).json(arrayData);
});

router.get("/getdata", async (req, res) => {
    const data = await word_desDB.get();
    const arrayData = [];
    if (data.empty) {
        res.status(404).send("Nothing in list");
    } else {
        data.forEach(element => {
            var result = new ReportModel(
                element.data().num_of_Scan,
                element.data().num_of_Search,
                element.data().word_Des_Id,
                element.data().word_Image,
                element.data().word_Pronounce,
                element.data().word_Status,
                element.data().word_Video,
            );
            arrayData.push(result);
        });
    }
    res.send(arrayData);
});

module.exports = router;