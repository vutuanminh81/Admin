const express = require("express");
var router = express.Router();
const cors = require("cors");
const db = require("../config");
const WordDesModel = require("../Model/word_description");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.json());
app.use(cors({
  origin:["http://localhost:3001"],
  methods:["PUT, GET, POST, DELETE, OPTIONS"]
}));
const WordDesDB = db.collection("Word_Description");

router.get("/currentId", async (req, res) => {
    var dataDB = await WordDesDB.get();
    var count = 0;
    dataDB.forEach(element => {
        count= count + 1;
      });
      count +=1;
    res.send(count.toString());
});
router.get("/getScanSearch", async (req, res) => {
  const data = await WordDesDB.get();
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
    arrayData.push({ name: "Scan", value: sumscan }, 
                   { name: "Search", value: sumsearch });
  }

  res.status(200).json(arrayData);
});

router.get("/numberlist", async (req, res) => {
  var dataDB = await WordDesDB.get();
  var count = 0;
  dataDB.forEach(element => {
    count = count + 1;
  });
  res.send(count.toString());
});

router.get("/:id", async (req, res) => {
  var id = Number(req.params.id);
  console.log(id);
  var wordDes;
  const data = await WordDesDB.where('Word_Des_Id', '==', id).get();
  // console.log(data.data());
  if (data.empty) {
    res.status(404).send("Cannot find word");
  } else {
    data.forEach(doc => {
      wordDes = doc.data();
    });
  }
  res.send(wordDes);
});

  router.post("/create", async (req, res) => {
    var data = req.body;
    var dataDB = await WordDesDB.get();
    var count = 0;
    dataDB.forEach(element => {
        count= count + 1;
      });
      count+=1 ;
      data.Word_Des_Id = count;
    console.log("data......",data);
    await WordDesDB.doc().set(data);
    res.send(count.toString());
  });

router.put("/update/:id", async (req, res) => {
  var id = Number(req.params.id);
  var dataupdate = req.body;
  var data = await WordDesDB.where('word_Des_Id', '==', id).get();
  var worddesId = "";
  if (data.empty) {
    res.status(404).send("Cannot find word");
  } else {
    data.forEach(doc => {
      worddesId = doc.id;
      res.send({ msg: "Updated" });
    });
    console.log(worddesId);
    await WordDesDB.doc(worddesId).set(dataupdate);
  }
});

router.put("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);
  const dataupdate = req.body;
  dataupdate.word_Des_Id = id;
  const data = await WordDesDB.where('word_Des_Id', '==', id).get();
  var wordId = "";
  if (data.empty) {
    res.status(404).send("Cannot find word");
  } else {
    data.forEach(doc => {
      wordId = doc.id;
      res.send({ msg: "Updated" });
    });
    await WordDesDB.doc(wordId).update({ "word_Status": 2 });
  }
});





router.post("/uploadImage", async (req, res) => {
  var data = req.body;
  console.log(data);
  
  res.send("ahhihihhiih");
});

module.exports = router;
