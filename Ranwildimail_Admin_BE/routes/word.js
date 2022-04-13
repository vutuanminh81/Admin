
const WordModel  = require("../Model/word");
const express = require("express");
var router = express.Router();
const cors = require("cors");
const db = require("../config");

const app = express();
app.use(express.json());
app.use(cors());
const WordDB = db.collection("Word");

router.get("/", async (req, res) => {
  const data = await WordDB.get();
  const arrayWord = [];
  if(data.empty){
    res.status(404).send("No word in list");
  }else{
    data.forEach(element => {
      var wordget = new WordModel(
        element.data().Language_Id,
        element.data().Word,
        element.data().Word_Des_Id,
        element.data().Word_Id,
        element.data().Word_Status
      );
      arrayWord.push(wordget);
    });
  }
  res.send(arrayWord);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
    const data = await WordDB.where('Word_Id' ,'==', id).get();
    if(data.empty){
      res.status(404).send("Cannot find word");
    }else{
        data.forEach(doc => {
          res.send(doc.data());
        });
    }
});

router.get("/getByWordDes/:id", async (req, res) => {
  const id = Number(req.params.id);
  const arrayWord = [];
    const data = await WordDB.where('Word_Des_Id' ,'==', id).get();
    if(data.empty){
      res.status(404).send("Cannot find word");
    }else{
      data.forEach(element => {
        var wordget = new WordModel(
          element.data().Language_Id,
          element.data().Word,
          element.data().Word_Des_Id,
          element.data().Word_Id,
          element.data().Word_Status
        );
        arrayWord.push(wordget);
      });
    }
    res.send(arrayWord);
});

router.post("/create", async (req, res) => {
  const dataDB = await WordDB.get();
    var count = 0;
    dataDB.forEach(element => {
        count= count + 1;
      });
      count+=1 ;
  var data = req.body;
  data.Word_Id = count;
  console.log(data.Word_Id)
  console.log("data......",data);
  await WordDB.doc().set(data);
  res.send(count.toString());
});

router.put("/update/:id", async (req, res) => {
  const id = Number(req.params.id);
    const dataupdate = req.body;
    dataupdate.Word_Id = id;
    const data = await WordDB.where('Word_Id' ,'==', id).get();  
    var wordId = "";
    if(data.empty){
      res.status(404).send("Cannot find word");
    }else{
        data.forEach(doc => {
          wordId = doc.id;
          res.send({ msg: "Updated" });
        });
        await WordDB.doc(wordId).set(dataupdate);
    }
});

router.put("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);
    const data = await WordDB.where('Word_Id' ,'==', id).get();  
    var wordId = "";
    if(data.empty){
      res.status(404).send("Cannot find word");
    }else{
        data.forEach(doc => {
          wordId = doc.id;
        });
        await WordDB.doc(wordId).update({"Word_Status": 2});
    }
  res.send({ msg: "Updated" });
});
module.exports = router;
