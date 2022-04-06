var express = require('express');
var router = express.Router();

var user = [
  {
    email: 'minhvt@gmail.com', password: 'admin'
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/Login', function (req, res) {
  let result = user.find(user => user.email == req.body.email)

  if (result) {
    if (result.password == req.body.Password) {
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
      message: "not okay"
    })
  }
})

module.exports = router;
