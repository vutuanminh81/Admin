const express = require("express");
var router = express.Router();
const cors = require("cors");
const db = require("../config");
const WordDesModel  = require("../Model/word_description");
const app = express();
app.use(express.json());
app.use(cors());
const WordDesDB = db.collection("Word_Description");

router.get("/numberlist", async (req, res) => {
    var dataDB = await WordDesDB.get();
    var count = 0;
    dataDB.forEach(element => {
        count= count + 1;
      });
    res.send(count.toString());
  });


router.get("/:id", async (req, res) => {
    var id = Number(req.params.id);
    console.log(id);
    const data = await WordDesDB.where('word_Des_Id' ,'==', id).get();
    // console.log(data.data());
    if(data.empty){
      res.status(404).send("Cannot find word");
    }else{
        data.forEach(doc => {
          res.send(doc.data());
        });
    }
  });

  router.post("/create", async (req, res) => {
    var data = req.body;
    var dataDB = await WordDesDB.get();
    var count = 0;
    dataDB.forEach(element => {
        count= count + 1;
      });
      count+=1 ;
      data.word_Des_Id = count;
    console.log("data......",data);
    await WordDesDB.doc().set(data);
    res.send(count.toString());
  });

  router.put("/update/:id", async (req, res) => {
    var id = Number(req.params.id);
    var dataupdate = req.body;
    var data = await WordDesDB.where('word_Des_Id' ,'==', id).get();  
    var worddesId = "";
    if(data.empty){
      res.status(404).send("Cannot find word");
    }else{
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
    const data = await WordDesDB.where('word_Des_Id' ,'==', id).get();  
    var wordId = "";
    if(data.empty){
      res.status(404).send("Cannot find word");
    }else{
        data.forEach(doc => {
          wordId = doc.id;
          res.send({ msg: "Updated" });
        });
        await WordDesDB.doc(wordId).update({"word_Status": 2});
    }
  });
  module.exports = router;