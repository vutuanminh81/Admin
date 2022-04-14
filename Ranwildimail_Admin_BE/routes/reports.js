var express = require('express');
var router = express.Router();
const cors = require("cors");
const db = require("../config");
const ReportModel = require("../Model/report");

var router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());
const ReportDB = db.collection("Report");

router.get("/getdata", async (req, res) => {
    const data = await ReportDB.get();
    const arrayData = [];
    if (data.empty) {
        res.status(404).send("Nothing in list");
    } else {
        data.forEach(element => {
            var result = new ReportModel(
                element.data().Actual_Word_Id,
                element.data().Day_Report,
                element.data().Expected_Word_Id,
                element.data().Note,
                element.data().Report_Id,
                element.data().Report_Image,
                element.data().Status,
            );
            arrayData.push(result);
            
        });
    }
    res.send(arrayData);
});

module.exports = router;