var express = require("express");
var router = express.Router();
const cors = require("cors");
const db = require("../config");
const AdminModel = require("../Model/admin");
const app = express();
app.use(express.json());
app.use(cors());
const md5 = require("md5");
const AdminDB = db.collection("Admin");

router.get("/", async (req, res) => {
  const text = req.params.text;
  var arrayUser = [];
  const data = await AdminDB.get();
  if (!data.empty) {
    data.forEach((element) => {
      var userget = new AdminModel(
        element.data().Address,
        element.data().Admin_Id,
        element.data().Full_Name,
        element.data().Password,
        element.data().Phone_Number,
        element.data().Status,
        element.data().User_Name
      );
      arrayUser.push(userget);
    });
    res.send(arrayUser);
  } else {
    res.send(false);
  }
});

router.get("/:email", async (req, res) => {
  const emailget = req.params.email;
  var adminRes;
  await AdminDB.where("User_Name", "==", emailget)
    .get()
    .then(function (querysnapshot) {
      querysnapshot.forEach(function (doc) {
        adminRes = doc.data();
      });
    });
  res.send(adminRes);
});

router.get("/checkEmail/:email", async (req, res) => {
  const emailget = req.params.email;
  const data = AdminDB.where("User_Name", "==", emailget).get();
  if (!data.empty) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get("/checkPhone/:phone", async (req, res) => {
  const phoneget = req.params.phone;
  const data = await AdminDB.where("Phone_Number", "==", phoneget).get();
  if (!data.empty) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get("/changePassword/:email/:password", async (req, res) => {
  const emailget = req.params.email;
  const passwordget = req.params.password;
  const data = await AdminDB.where("User_Name", "==", emailget).get();
  if (!data.empty) {
    await AdminDB.where("User_Name", "==", emailget)
      .get()
      .then(function (querysnapshot) {
        querysnapshot.forEach(function (doc) {
          doc.ref.update({ Password: passwordget });
          res.send(true);
        });
      });
  } else {
    res.send(false);
  }
});

router.post("/create", async (req, res) => {
  const dataDB = await AdminDB.get();
  var count = 0;
  dataDB.forEach((element) => {
    count = count + 1;
  });
  count += 1;
  var data = req.body;
  data.Admin_Id = count;
  await AdminDB.doc().set(data);
  res.send(count.toString());
});

router.put("/update/:email", async (req, res) => {
  // const id = Number(req.params.id);
  //   dataupdate.Admin_Id = id;
  //   var adminId="";
  //   const data = await AdminDB.where('Admin_Id' ,'==', id).get();
  //   if(data.empty){
  //     res.status(404).send("Cannot find word");
  //   }else{
  //       data.forEach(doc => {
  //         dataupdate.Password = doc.data().Password;
  //         adminId = doc.id;
  //         console.log(adminId);
  //       });
  //       await AdminDB.doc(adminId).set(dataupdate);
  //       res.send({ msg: "Updated" });
  //   }

  const emailget = req.params.email;
  const dataupdate = req.body;
  const reqDB = await AdminDB.where("User_Name", "==", emailget).get();
  if (!reqDB.empty) {
    await AdminDB.where("User_Name", "==", emailget)
      .get()
      .then(function (querysnapshot) {
        querysnapshot.forEach(function (doc) {
          doc.ref.update(dataupdate);
        });
      });
    res.send(true);
  } else {
    res.send(false);
  }
});

router.put("/delete/:email", async (req, res) => {
  const emailget = req.params.email;
  const reqDB = await AdminDB.where("User_Name", "==", emailget).get();
  if (!reqDB.empty) {
    reqDB.forEach((doc) => {
      if (doc.data().Admin_Id != 1) {
        AdminDB.where("User_Name", "==", emailget)
          .get()
          .then(function (querysnapshot) {
            querysnapshot.forEach(function (doc) {
              doc.ref.update({ Status: 2 });
              res.send(true);
            });
          });
      } else {
        res.send(false);
      }
    });
  } else {
    res.send(false);
  }
});

router.put("/enable/:email", async (req, res) => {
  const emailget = req.params.email;
  const reqDB = await AdminDB.where("User_Name", "==", emailget).get();
  if (!reqDB.empty) {
    await AdminDB.where("User_Name", "==", emailget)
      .get()
      .then(function (querysnapshot) {
        querysnapshot.forEach(function (doc) {
          doc.ref.update({ Status: 1 });
          res.send(true);
        });
      });
  } else {
    res.send(false);
  }
});

module.exports = router;
