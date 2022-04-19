var express = require('express');
var router = express.Router();
const cors = require("cors");
const db = require("../config");
const ReportModel = require("../Model/report");
const SimpleDateFormat = require('@riversun/simple-date-format');

var router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());
const ReportDB = db.collection("Report");


router.get("/getdata", async (req, res) => {
    const data = await ReportDB.get();
    const arrayData = [];
    var dayResult = [];
    if (data.empty) {
        res.status(404).send("Nothing in list");
    } else {
        var days = [];
        data.forEach(element => {

            days = element.data().Day_Report,
                arrayData.push(days);

        });

        arrayData.sort();
        arrayData.reverse();
        
        var last7day = get7Day();
        
        arrayData.forEach(times => {
            if (compareDays(times)) {
                // dayResult.push(getDayMonth(times));

                last7day.forEach(element => {
                    var count = 0;
                    const listday = element.day;
                    const checkday = getDayMonth(times);
                    if (element.day === getDayMonth(times)) {
                        count = Number.parseInt(element.report);
                        count += 1;
                        element.report = count;
                    } else return;
                })
            } else return;
        });

        last7day.sort();
        last7day.reverse();
        res.status(200).json(last7day);
    }
});

router.get("/count", async (req, res) => {
    const data = await ReportDB.get();
    const arrayData = [];
    if (data.empty) {
        res.status(404).send("Nothing in list");
    } else {

        data.forEach(element => {
            arrayData.push(element.data().Day_Report);

        });
    }
    res.status(200).json(arrayData.length);
});

function getDayMonth(days) {
    var daySplit = splitDay(days);
    var arrDay = daySplit.split("-");
    return arrDay[2] + "/" + arrDay[1];
}

function compareDays(daycheck) {
    var currentDay = getCurrentDay();
    var current = new Date(currentDay);
    var last = new Date(current.getTime() - (6 * 24 * 60 * 60 * 1000));

    var dayCheck = new Date(splitDay(daycheck));
    var result = false;


    // console.log(dayCheck >= last && dayCheck <= current);
    if (dayCheck >= last && dayCheck <= current) {
        result = true;
    }

    return result;
}

function splitDay(day) {
    var result = day.split(" ");
    return result[0];
}

function getCurrentDay() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();

    return year + "-" + month + "-" + date;
};

function get7Day() {
    var currentDay = getCurrentDay();
    var current = new Date(currentDay);
    var result = [{ day: getDayMonth(currentDay), report: 0 }]

    for (var i = 1; i < 7; i++) {
        var last = new Date(current.getTime() - (i * 24 * 60 * 60 * 1000)).toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.log(last);
        console.log(getDayMonth(last));
        var dayMonth = getDayMonth(last);
        result.push({ day: dayMonth, report: 0 });
    }
    return result;
}

module.exports = router;