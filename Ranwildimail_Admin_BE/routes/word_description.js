const express = require("express");
var router = express.Router();
const cors = require("cors");
const db = require("../config");
const WordDesModel = require("../Model/word_description");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["PUT, GET, POST, DELETE, OPTIONS"],
  })
);
const WordDesDB = db.collection("Word_Description");
const WordDB = db.collection("Word");

router.get("/currentId", async (req, res) => {
  var dataDB = await WordDesDB.get();
  var count = 0;
  dataDB.forEach((element) => {
    count = count + 1;
  });
  count += 1;
  res.send(count.toString());
});

router.get("/getlistall", async (req, res) => {
  var dataWordDes = await WordDesDB.get();
  var dataWord = await WordDB.where("Language_Id", "==", 2).get();
  var result = [];
  dataWordDes.forEach((res1) => {
    dataWord.forEach((res2) => {
      if (res2.data().Word_Des_Id == res1.data().Word_Des_Id) {
        result.push({
          Word_Des_Id: res1.data().Word_Des_Id,
          Word_Image: res1.data().Word_Image,
          Word: res2.data().Word,
          Total_Search: res1.data().num_Of_Scan + res1.data().num_Of_Search,
          Word_Status: res2.data().Word_Status,
        });
      }
    });
  });
  res.send(result);
});

router.get("/getScanSearch", async (req, res) => {
  const data = await WordDesDB.get();
  const arrayData = [];

  if (data.empty) {
    res.status(404).send("Nothing in list");
  } else {
    var sumscan = 0;
    var sumsearch = 0;
    data.forEach((element) => {
      sumscan += element.data().num_Of_Scan;
      sumsearch += element.data().num_Of_Search;
    });
    arrayData.push(
      { name: "Scan", value: sumscan },
      { name: "Search", value: sumsearch }
    );
  }

  res.status(200).json(arrayData);
});

router.get("/numberlist", async (req, res) => {
  var dataDB = await WordDesDB.get();
  var count = 0;
  dataDB.forEach((element) => {
    count = count + 1;
  });
  count += 1;
  res.send(count.toString());
});

router.get("/:id", async (req, res) => {
  var id = Number(req.params.id);
  console.log(id);
  var wordDes;
  const data = await WordDesDB.where("Word_Des_Id", "==", id).get();
  // console.log(data.data());
  if (data.empty) {
    res.status(404).send("Cannot find word");
  } else {
    data.forEach((doc) => {
      wordDes = doc.data();
    });
  }
  res.send(wordDes);
});

router.put("/update/:id", async (req, res) => {
  var id = Number(req.params.id);
  var dataupdate = req.body;
  var data = await WordDesDB.where("Word_Des_Id", "==", id).get();
  if (!data.empty) {
    console.log(dataupdate);
    await WordDesDB.where("Word_Des_Id", "==", id)
      .get()
      .then(function (querysnapshot) {
        querysnapshot.forEach(function (doc) {
          doc.ref.update(dataupdate);
        });
      });
    res.send({ msg: "Updated" });
    
  } else {
    res.status(404).send("Cannot find word");
  }
});

router.post("/create", async (req, res) => {
  var data = req.body;
  var dataDB = await WordDesDB.get();
  var count = 0;
  dataDB.forEach((element) => {
    count = count + 1;
  });
  count += 1;
  data.Word_Des_Id = count;
  console.log("data......", data);
  await WordDesDB.doc().set(data);
  res.send(count.toString());
});



router.put("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);
  const dataupdate = req.body;
  dataupdate.word_Des_Id = id;
  const data = await WordDesDB.where("word_Des_Id", "==", id).get();
  var wordId = "";
  if (data.empty) {
    res.status(404).send("Cannot find word");
  } else {
    data.forEach((doc) => {
      wordId = doc.id;
    });
    await WordDesDB.doc(wordId).update({ word_Status: 2 });
    res.send({ msg: "Updated" });
  }
});

module.exports = router;
