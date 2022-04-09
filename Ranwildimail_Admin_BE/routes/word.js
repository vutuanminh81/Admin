const express = require("express");
const cors = require("cors");
const db = require("../config");
const WordModel  = require("./word");

var router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());
const WordDB = db.collection("Word");

app.get("/", async (req, res) => {
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

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await WordDB.doc(id).get();
  if(!data.exists){
    res.status(404).send("Cannot find word");
  }else{
    res.send(data.data());
  }
});

app.post("/create", async (req, res) => {
  const data = req.body;
  console.log("data......",data);
  await WordDB.doc().set(data);
  res.send({ msg: "User Added" });
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  await WordDB.doc(id).update(data);
  res.send({ msg: "Updated" });
});

app.put("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await WordDB.doc(id).get();

  await WordDB.doc(id).update({"Word_Status": 2});
  res.send({ msg: "Updated" });
});

module.exports = router;