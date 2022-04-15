var express = require('express');
var router = express.Router();
const cors = require("cors");
const db = require("../config");
const e = require('cors');
const { off } = require('../app');
const { database } = require('firebase');

var router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());

const word_desDB = db.collection("Word_Description");
const WordDB = db.collection("Word");

router.get("/getTopAnimal", async (req, res) => {
    const data = await word_desDB.get();
    const word = await WordDB.get();
    const sumData = [];
    const top5 = [];
    const result = [];

    if (data.empty) {
        res.status(404).send("Nothing in list");
    } else {
        data.forEach(element => {
            sumData.push(
                {
                    id: element.data().Word_Des_Id,
                    count: element.data().num_Of_Scan + element.data().num_Of_Search,
                    image: element.data().Word_Image,
                }
            );
        });
    }

    sumData.sort((a, b) => b.count - a.count);
    sumData.splice(5, sumData.length);
    console.log(sumData);

    if (word.empty) {
        res.status(404).send("Nothing in list");
    } else {
        word.forEach(element => {
            if (element.data().Language_Id == 2) {
                result.push(
                    {
                        id: element.data().Word_Des_Id,
                        word: element.data().Word,
                    }
                );
            }

        });
    }
    sumData.forEach(element => {
        result.forEach(ele => {
            if (element.id == ele.id) {
                top5.push({
                    name: ele.word,
                    count: element.count,
                    image: element.image,
                })
            }
        })
    })
    res.status(200).json(top5);
});

module.exports = router;
// sumData.forEach(async   => {
    //     var getdata = null;
    //     (await alo).forEach(res => {
    //         if (res.data().Language_Id == 2) {
    //             getdata = {
    //                 name: res.data().Word,
    //                 count: element.count,
    //                 image: element.image,
    //             };
    //         }
    //     });
    //     console.log(getdata);
    //     top5.push(getdata);
    // });
    //         .get()
    //         .then(async function (querysnapshot) {
    //             querysnapshot.forEach(async function (doc) {

    //                 }
    //             });

    //         });
    //         console.log(getdata);
    //         top5.push(getdata);

// }