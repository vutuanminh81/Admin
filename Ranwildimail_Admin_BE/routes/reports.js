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
        
        arrayData.forEach(times => {
            if (compareDays(times)) {
                dayResult.push(getDayMonth(times));
            } else return;
        });

        dayResult.sort();
        res.status(200).json(compareString(dayResult));
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
    return arrDay[1] + "/" + arrDay[2];
}

function compareString(days) {
    var count = 0;
    var result = [];
    days.forEach(element => {
        count = count_element_in_array(days, element);
        result.push({ day: element, report: count });
        days = days.filter(days => days !== element);
    });

    result = result.filter(result => result.report !== 0);
    return result;
}

function count_element_in_array(array, x) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] == x) //Tìm thấy phần tử giống x trong mảng thì cộng biến đếm
            count++;
    }
    console.log(array);
    console.log(x);
    console.log(count);
    return count;
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

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    return year + "-" + month + "-" + date;
};

module.exports = router;