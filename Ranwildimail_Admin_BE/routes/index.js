var express = require('express');
var router = express.Router();

const users = [
  {email: "minhvt@gmail.com", password: "admin"},
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/Login', function (req, res) {
  let result = users.find(users => users.email == req.body.email);
  console.log("nick: "+ users.email);
  console.log("nick: "+ req.body.email);
  console.log(result);
  
  if (result) {
    if (result.password == req.body.password) {
      res.status(200).send({
        message: "oke"
      })
    } else {
      res.status(200).send({
        message: "not ok"
      })
    }
  } else {
    res.status(200).send({
      message: users.email
    })
  }
})

module.exports = router;
