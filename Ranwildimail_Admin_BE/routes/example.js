const express = require("express");
var router = express.Router();
const cors = require("cors");
const db = require("../config");
const ExampleModel = require("../Model/example");
const app = express();
app.use(express.json());
app.use(cors());
const ExampleDB = db.collection("Example");

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const listExmaple = [];
  console.log(id);
  const data = await ExampleDB.where("Word_Id", "==", id).get();
  // console.log(data.data());
  if (data.empty) {
    res.send("Cannot find word");
  } else {
    data.forEach((element) => {
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
  dataDB.forEach((element) => {
    count = count + 1;
  });
  Array.from(data).forEach((element) => {
    count += 1;
    element.Ex_Id = count;
    console.log(element.data);
    ExampleDB.doc().set(element);
  });
  res.send({ msg: "User Added" });
});

router.put("/update", async (req, res) => {
  var dataupdate = req.body;
  const dataDB = await ExampleDB.get();
  var count = 0;
  dataDB.forEach((element) => {
    count = count + 1;
  });

  dataupdate.forEach(async (res) => {
    if (res.Ex_Id == 0) {
      count += 1;
      res.Ex_Id = count;
      await ExampleDB.doc().set(res);
    } else {
      var getdata = await ExampleDB.where("Ex_Id", "==", res.Ex_Id).get();
      if (!getdata.empty) {
        await ExampleDB.where("Ex_Id", "==", res.Ex_Id)
          .get()
          .then(function (querysnapshot) {
            console.log("aaaaaaa");
            querysnapshot.forEach(function (doc) {
              doc.ref.set(res);
            });
          });
      }
    }
  });
  res.send("update");
});

router.put("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await ExampleDB.doc(id).update({ Word_Status: 2 });
  res.send({ msg: "Updated" });
});
module.exports = router;
