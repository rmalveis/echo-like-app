var express = require('express');
var router = express.Router();
const axios = require('axios');

const sampleData = {
  passTo: 'mve',
  anyOtherKey: 'withAnyValue',
};

router.use(function timeLog(req, res, next) {
  console.log('Time: ', new Date().toLocaleString());
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200);
  res.render('index', { data: JSON.stringify(sampleData, null, 4) });
});

router.post('/', function (req, res, next) {
  console.log('Post to / received');
  const body = JSON.parse(JSON.stringify(req.body));
  body.success = true;

  if (body.passTo && body.passTo !== '') {
    const passTo = body.passTo;
    delete body.passTo;
    axios.post('http://' + passTo + '/', body)
      .then(function (response) {
        console.log(`request for ${passTo} returned with success`);
        body.passTo = {
          nameRequested: passTo,
          ...JSON.parse(JSON.stringify(response.data)),
        };
        res.render('post', { data: JSON.stringify(body, null, 4) });
      })
      .catch(function (error) {
        console.log(error);
        res.render('error', {
          data: JSON.stringify(body, null, 4),
          message: error.message, error,
        });
      });

  } else {
    console.log('stop cascading calls');
    res.send(body);
  }
});

module.exports = router;
