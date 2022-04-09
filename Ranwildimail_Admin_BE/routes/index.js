var express = require('express');
var router = express.Router();
const cors = require("cors");
const db = require("../config");

const app = express();
app.use(express.json());
app.use(cors());
const md5 = require("md5");
const AdminDB = db.collection("Admin");

router.get("login/:username/:password", async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    const DBUsername = await AdminDB.where('User_Name','==',username).get();
    if(!DBUsername.empty){
        DBUsername.forEach(doc => {
           if(doc.data().Password == password){
            res.send(true);
           }else{
            res.send(false);
           }
          });
        
    }else{
        res.send(false);
    }
});


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.post('/Login', function (req, res) {
//   let result = users.find(users => users.email == req.body.email);
//   console.log("nick: "+ users.email);
//   console.log("nick: "+ req.body.email);
//   console.log(result);
  
//   if (result) {
//     if (result.password == req.body.password) {
//       res.status(200).send({
//         message: "oke"
//       })
//     } else {
//       res.status(200).send({
//         message: "not ok"
//       })
//     }
//   } else {
//     res.status(200).send({
//       message: users.email
//     })
//   }
// })

module.exports = router;
