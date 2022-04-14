var express = require('express');
var router = express.Router();
const cors = require("cors");
const db = require("../config");
const ReportModel = require("../Model/report");

var router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());
// const ReportDB = db.collection("Report");
// const WordDB = db.collection("Word");

router.get("/getdata", async (req, res) => {
    // const data = await ReportDB.get();
    const arrayData = [
        "2022-04-11 01:52:38",
        "2022-04-11 10:40:59",
        "2022-04-11 10:46:53",
        "2022-04-12 08:47:07",
        "2022-04-12 08:47:13",
        "2022-04-12 08:47:18",
        "2022-04-12 08:47:19",
        "2022-04-12 08:51:28",
        "2022-04-12 08:52:13",
        "2022-04-12 09:16:50",
        "2022-04-13 04:46:46"
      ];
    // if (data.empty) {
    //     res.status(404).send("Nothing in list");
    // } else {
    //     var days = [];
    //     data.forEach(element => {
            
    //         days = element.data().Day_Report,
                
            
    //         arrayData.push(days);
            
    //     });
        // arrayData.sort();
    // }
    
    arrayData.sort();
    arrayData.reverse();
    

    console.log(compareDays("2022-02-28 01:52:38"));

    
    
    // arrayData.forEach(times => {
        
    // })
    res.status(200).json(arrayData);
});

function compareDays(daycheck) {
    var currentDay = getCurrentDay();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    console.log(currentDay);
    var current = new Date("2022-03-04 04:46:46");
    var check = new Date(daycheck)
    var result = current.getDate() - check.getDate();
    return result;
}

function getCurrentDay(){
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    
    // current year
    let year = date_ob.getFullYear();
    
    // current hours
    let hours = date_ob.getHours();
    
    // current minutes
    let minutes = date_ob.getMinutes();
    
    // current seconds
    let seconds = date_ob.getSeconds();
    
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
};

module.exports = router;