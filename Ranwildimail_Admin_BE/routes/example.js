const express = require("express");
var router = express.Router();
const cors = require("cors");
const db = require("../config");
const ExampleModel  = require("../Model/example");
const app = express();
app.use(express.json());
app.use(cors());
const ExampleDB = db.collection("Example");

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const listExmaple = [];
    console.log(id);
    const data = await ExampleDB.where('Word_Id' ,'==', id).get();
    // console.log(data.data());
    if(data.empty){
      res.status(404).send("Cannot find word");
    }else{
        data.forEach(element => {
            var wordget = new ExampleModel(
              element.data().Ex_Id,
              element.data().Ex_Status,
              element.data().Example,
              element.data().Word_Id
            );
            listExmaple.push(wordget);
          });
    }
    res.send(listExmaple);
  });

  router.post("/create", async (req, res) => {
    const data = req.body;
    const dataDB = await ExampleDB.get();
    var count = 0;
    dataDB.forEach(element => {
        count= count + 1;
    });
    Array.from(data).forEach(element => {
        count+=1 ;
        element.Ex_Id = count;
        console.log(element.data);
        ExampleDB.doc().set(element);
    });
    res.send({ msg: "User Added" });
  });

  
  router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await ExampleDB.doc(id).update(data);
    res.send({ msg: "Updated" });
  });
  
  router.put("/delete/:id", async (req, res) => {
    const id = req.params.id;
  
    await ExampleDB.doc(id).update({"Word_Status": 2});
    res.send({ msg: "Updated" });
  });
  module.exports = router;