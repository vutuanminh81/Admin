var express = require('express');

const cors = require("cors");
const db = require("../config");

const app = express();
app.use(express.json());
app.use(cors());
const md5 = require("md5");
const AdminDB = db.collection("Admin");
var router = express.Router();

// const bodyPaser= require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

// app.use(bodyPaser.urlencoded({extended : true}));
// app.use(cookieParser());
// app.use(session({
//     key : "userId",
//     secret : "subscripeawdawdadwwfthfh123",
//     resave : false,
//     saveUninitialized: false,
//     cookie:{
//         expires: 60*60*24,
//     }
// }));
var userSession;

router.get("/session", async (req, res) => {
    req.session.viewCount++;
    console.log("okokok");
    console.log(req.session);
    res.send(req.session);
});

app.get('/logout', async (req,res) => {
    req.session.destroy(function(err) {
        return res.status(200).json({status: 'success', session: 'cannot access session here'})
    })
});

//get session
app.get('/get_session',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send(true);
    }else{
        res.send(false);
    }
});

router.get("/login/:username/:password", async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    const DBUsername = await AdminDB.where('User_Name','==',username).get();
    if(!DBUsername.empty){
        DBUsername.forEach(doc => {
           if(doc.data().Password == password){
            
            userSession=req.session;
            userSession.userId = req.params.username;
            console.log(req.session);
            console.log(userSession);
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
